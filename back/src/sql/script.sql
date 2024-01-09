CREATE TABLE Usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100)
);

CREATE TABLE Conversaciones (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100)
);

CREATE TABLE Mensajes (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES Usuarios(id),
  conversacion_id INTEGER REFERENCES Conversaciones(id),
  contenido TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Usuarios_Conversaciones (
  usuario_id INTEGER REFERENCES Usuarios(id),
  conversacion_id INTEGER REFERENCES Conversaciones(id),
  PRIMARY KEY(usuario_id, conversacion_id)
);
INSERT INTO Usuarios (nombre) VALUES ('Usuario1'), ('Usuario2'), ('Usuario3');
INSERT INTO Conversaciones (nombre) VALUES ('Sala de Chat');

INSERT INTO Usuarios_Conversaciones (usuario_id, conversacion_id) VALUES 
(1, 1), 
(2, 1), 
(3, 1);
INSERT INTO Mensajes (usuario_id, conversacion_id, contenido) VALUES 
(1, 1, 'Hola, ¿cómo están?'), 
(2, 1, 'Bien, ¿y tú?'), 
(3, 1, '¡Me uno a la conversación!');



SELECT 
  Usuarios.nombre, 
  Mensajes.timestamp, 
  Mensajes.contenido 
FROM Mensajes 
JOIN Usuarios ON Mensajes.usuario_id = Usuarios.id 
WHERE Mensajes.conversacion_id = 1 
ORDER BY Mensajes.timestamp;