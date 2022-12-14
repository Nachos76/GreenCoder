import { Alumno } from '../models/alumno.model';
export const ALUMNOS: Alumno[] = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Perez',
    dni: '12345678',
    sexo: 'Masculino',
    fechaNacimiento: '2000-01-01',
    direccion: 'Av. Siempreviva 555',
    telefono: '12345678',
    email: 'jperez99@gmail.com',
    estado: true,
    imagen: '/assets/avatars/av1.png',
    conocimientos: [
      'Angular',
      'JavaScript',
      'TypeScript',
      'C#',
      'C++',
      'HTML',
      'CSS',
      'SQL',
      'PHP',
    ],
    cursos: ['Angular', 'JavaScript', 'TypeScript'],
    descripcion: 'Curioso, fanatico de lo que hago.',
  },
  {
    id: 2,
    nombre: 'Santiago',
    apellido: 'Pachano',
    dni: '12345678',
    sexo: 'Masculino',
    fechaNacimiento: '1999-05-23',
    direccion: 'En la sierra cordobeza',
    telefono: '12345678',
    email: 'p4ch4n0@gmail.com',
    estado: false,
    imagen: '',
    conocimientos: ['React', 'JavaScript', 'TypeScript'],
    cursos: ['JavaScript'],
  },
  {
    id: 3,
    nombre: 'Sofia',
    apellido: 'Soule',
    dni: '12345678',
    sexo: 'Masculino',
    fechaNacimiento: '1976-07-20',
    direccion: 'Al pie del Aconquija',
    telefono: '12345678',
    email: 'sofita88@live.com',
    estado: true,
    imagen: '/assets/avatars/av3.png',
    conocimientos: ['HTML', 'JavaScript', 'CSS'],
    cursos: ['Desarrollo Web'],
    descripcion: 'me gusta la musica, los animales y la web',
  },
  {
    id: 4,
    nombre: 'Cintia',
    apellido: 'Nañarara',
    dni: '12345678',
    sexo: 'Masculino',
    fechaNacimiento: '1998-04-26',
    direccion: 'Balcarce 50',
    telefono: '12345678',
    email: 'hnana@gmail.com',
    estado: true,
    imagen: '/assets/avatars/av4.png',
    conocimientos: [],
    cursos: ['Desarrollo Web'],
    descripcion: 'Buscando aprender para desarrollarme profesionalmente.',
  },
  {
    id: 5,
    nombre: 'Lucy',
    apellido: 'Liu',
    dni: '12345678',
    sexo: 'Masculino',
    fechaNacimiento: '2001-06-04',
    direccion: 'Av. Rivadavia 12333',
    telefono: '12345678',
    email: 'lliu_chi@hotmail.com',
    estado: true,
    imagen: '/assets/avatars/av5.png',
    conocimientos: ['.NET', 'HTML', 'SQL', 'C#', 'CSS', 'Backend'],
    cursos: ['.NET', 'Node.js', 'TypeScript', 'C#'],
    descripcion: 'Curiosa, amante de la tecnologia.',
  },
];
