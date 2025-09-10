import { evaluarActivo } from './services/IAService';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table, Modal, Layout, Typography, message } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import Login from './components/Login';
import { isAuthenticated, logout } from './services/LoginService';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const EditableContext = React.createContext(null);

// Editable Row Component
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

// Editable Cell Component
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) inputRef.current.focus();
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

// Activos iniciales para IA
const activosIniciales = [
  { nombre: "Servidor de base de datos", tipo: "Base de Datos" },
  { nombre: "Aplicación Web de Banca", tipo: "Aplicación" },
  { nombre: "Firewall Perimetral", tipo: "Seguridad" },
  { nombre: "Base de Datos Clientes", tipo: "Base de Datos" },
  { nombre: "Backup en NAS", tipo: "Almacenamiento" },
];

const App = () => {
  // Estados de autenticación y usuario
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user') || '');

  // Estados de la aplicación
  const [isLoading, setIsLoading] = useState(false);
  const [isRecommending, setIsRecommending] = useState(false);
  const [suggestEnabled, setSuggestEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(1);
  const [newData, setNewData] = useState({ activo: '', riesgo: '', impacto: '', tratamiento: '' });

  // Llenar la tabla con IA al iniciar sesión
  useEffect(() => {
    if (authenticated && dataSource.length === 0) {
      const resultados = activosIniciales.map((activo, index) => {
        const evaluacion = evaluarActivo(activo); // IA genera riesgo e impacto
        return {
          key: `${index + 1}`,
          activo: activo.nombre,
          riesgo: evaluacion.riesgo,
          impacto: evaluacion.impacto,
          tratamiento: '-'
        };
      });
      setDataSource(resultados);
      setCount(resultados.length + 1);
    }
  }, [authenticated, dataSource]);

  // Login exitoso
  const handleLoginSuccess = (response) => {
    setAuthenticated(true);
    setCurrentUser(response.user);
    message.success(`Bienvenido, ${response.user}!`);
  };

  // Logout
  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    setCurrentUser('');
    message.info('Sesión cerrada correctamente');
  };

  // Modal de agregar activo
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  // Agregar fila nueva
  const addNewRow = (activo, riesgo, impacto) => {
    const newRow = { key: `${count}`, activo, riesgo, impacto, tratamiento: '-' };
    setDataSource([...dataSource, newRow]);
    setCount(count + 1);
    setNewData({ activo: '', riesgo: '', impacto: '', tratamiento: '' });
  };

  const handleOk = () => {
    if (!newData.activo.trim()) {
      message.error('Por favor ingresa un nombre de activo');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const mockRiesgo = `Pérdida de ${newData.activo}`;
      const mockImpacto = `Pérdida de información valiosa relacionada con ${newData.activo}`;
      addNewRow(newData.activo, mockRiesgo, mockImpacto);
      setIsModalVisible(false);
      setIsLoading(false);
      setSuggestEnabled(true);
      message.success(`Activo "${newData.activo}" agregado con éxito`);
    }, 1000);
  };

  const handleDelete = (key) => setDataSource(dataSource.filter(item => item.key !== key));

  const handleRecommendTreatment = () => {
    if (dataSource.length === 0) {
      message.warning('No hay riesgos para recomendar tratamientos');
      return;
    }
    setIsRecommending(true);
    setTimeout(() => {
      const treatments = [
        'Implementación de controles de acceso físico',
        'Copias de seguridad periódicas',
        'Cifrado de datos sensibles',
        'Capacitación de personal sobre seguridad',
        'Implementación de firewall de nueva generación',
        'Monitoreo continuo de accesos',
        'Desarrollo de políticas de seguridad'
      ];
      const newDataSource = dataSource.map(item => ({
        ...item,
        tratamiento: treatments[Math.floor(Math.random() * treatments.length)]
      }));
      setDataSource(newDataSource);
      setIsRecommending(false);
      message.success('Tratamientos recomendados con éxito');
    }, 1500);
  };

  const handleSave = (row) => {
    const newDataArr = [...dataSource];
    const index = newDataArr.findIndex(item => item.key === row.key);
    newDataArr.splice(index, 1, { ...newDataArr[index], ...row });
    setDataSource(newDataArr);
  };

  // Columnas de la tabla
  const defaultColumns = [
    { title: 'Activo', dataIndex: 'activo', width: '15%', editable: true },
    { title: 'Riesgo', dataIndex: 'riesgo', width: '20%', editable: true },
    { title: 'Impacto', dataIndex: 'impacto', width: '30%', editable: true },
    { title: 'Tratamiento', dataIndex: 'tratamiento', width: '30%', editable: true },
    {
      title: 'Operación',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="¿Seguro que quieres eliminar?" onConfirm={() => handleDelete(record.key)}>
            <a>Eliminar</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const components = { body: { row: EditableRow, cell: EditableCell } };
  const columns = defaultColumns.map(col => {
    if (!col.editable) return col;
    return { ...col, onCell: record => ({ record, editable: col.editable, dataIndex: col.dataIndex, title: col.title, handleSave }) };
  });

  if (!authenticated) return <Login onLoginSuccess={handleLoginSuccess} />;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Title level={4} style={{ color: 'white', margin: 0 }}>Sistema de Auditoría de Riesgos</Title>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text style={{ color: 'white', marginRight: 16 }}><UserOutlined /> {currentUser}</Text>
          <Button type="link" icon={<LogoutOutlined />} onClick={handleLogout} style={{ color: 'white' }}>Cerrar Sesión</Button>
        </div>
      </Header>

      <Content style={{ padding: '24px', background: '#fff' }}>
        <Button onClick={showModal} type="primary" style={{ marginBottom: 16 }}>+ Agregar activo</Button>
        <Button
          onClick={handleRecommendTreatment}
          type="primary"
          loading={isRecommending}
          disabled={!suggestEnabled}
          style={{ marginBottom: 16, marginLeft: 8 }}
        >
          Recomendar tratamientos
        </Button>

        <Modal
          title="Agregar nuevo activo"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Agregar"
          cancelText="Cancelar"
          confirmLoading={isLoading}
        >
          <Form layout="vertical">
            <Form.Item label="Activo" rules={[{ required: true, message: 'Por favor ingresa un nombre de activo' }]}>
              <Input
                name="activo"
                value={newData.activo}
                onChange={e => setNewData({ ...newData, activo: e.target.value })}
                placeholder="Ej: Base de datos de clientes"
              />
            </Form.Item>
          </Form>
        </Modal>

        <Table components={components} rowClassName={() => 'editable-row'} bordered dataSource={dataSource} columns={columns} />
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Sistema de Auditoría de Riesgos ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default App;
