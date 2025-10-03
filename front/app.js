const apiBase = "https://localhost:7232/api"; // tu backend

// ====== CREAR COLEGIO ======
document.getElementById("form-colegio").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = { nombre: document.getElementById("colegio-nombre").value };
  const res = await fetch(`${apiBase}/Colegio`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
  });
  if (res.ok) { alert("Colegio creado!"); loadColegios(); }
});

// ====== CREAR ASIGNATURA ======
document.getElementById("form-asignatura").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = { nombre: document.getElementById("asignatura-nombre").value };
  const res = await fetch(`${apiBase}/Asignatura`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
  });
  if (res.ok) { alert("Asignatura creada!"); loadAsignaturas(); }
});

// ====== CREAR ESTUDIANTE ======
document.getElementById("form-estudiante").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    nombre: document.getElementById("estudiante-nombre").value,
    colegioId: parseInt(document.getElementById("estudiante-colegioId").value)
  };
  const res = await fetch(`${apiBase}/Estudiante`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
  });
  if (res.ok) { alert("Estudiante creado!"); loadEstudiantes(); }
});

// ====== CREAR PERIODO ======
document.getElementById("form-periodo").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    nombre: document.getElementById("periodo-nombre").value,
    porcentaje: parseInt(document.getElementById("periodo-porcentaje").value)
  };
  const res = await fetch(`${apiBase}/Periodo`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
  });
  if (res.ok) { alert("Periodo creado!"); loadPeriodos(); }
});

// ====== CREAR NOTA ======
document.getElementById("form-nota").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    score: parseInt(document.getElementById("nota-score").value),
    estudianteId: parseInt(document.getElementById("nota-estudianteId").value),
    asignaturaId: parseInt(document.getElementById("nota-asignaturaId").value),
    periodoId: parseInt(document.getElementById("nota-periodoId").value)
  };
  const res = await fetch(`${apiBase}/Nota`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
  });
  if (res.ok) { alert("Nota creada!"); loadNotas(); }
});

// ================== LISTADOS ==================
async function loadColegios() {
  const res = await fetch(`${apiBase}/Colegio`);
  const data = await res.json();
  const tbody = document.querySelector("#tabla-colegios tbody");
  tbody.innerHTML = "";
  const selectEst = document.getElementById("estudiante-colegioId");
  selectEst.innerHTML = '<option value="">Seleccione un colegio</option>';
  data.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.nombre}</td>
      <td>${c.maxEstudiantes ?? "N/A"}</td>
      <td>${c.estudiantes ? c.estudiantes.length : 0}</td>
    `;
    tbody.appendChild(tr);
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.nombre;
    selectEst.appendChild(opt);
  });
}

async function loadAsignaturas() {
  const res = await fetch(`${apiBase}/Asignatura`);
  const data = await res.json();
  const tbody = document.querySelector("#tabla-asignaturas tbody");
  tbody.innerHTML = "";
  const selectNota = document.getElementById("nota-asignaturaId");
  selectNota.innerHTML = '<option value="">Seleccione asignatura</option>';
  data.forEach(a => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${a.id}</td><td>${a.nombre}</td>`;
    tbody.appendChild(tr);
    const opt = document.createElement("option");
    opt.value = a.id;
    opt.textContent = a.nombre;
    selectNota.appendChild(opt);
  });
}

async function loadEstudiantes() {
  const res = await fetch(`${apiBase}/Estudiante`);
  const data = await res.json();
  const tbody = document.querySelector("#tabla-estudiantes tbody");
  tbody.innerHTML = "";
  const selectNota = document.getElementById("nota-estudianteId");
  selectNota.innerHTML = '<option value="">Seleccione estudiante</option>';
  data.forEach(e => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${e.id}</td><td>${e.nombre}</td><td>${e.colegioNombre}</td>`;
    tbody.appendChild(tr);
    const opt = document.createElement("option");
    opt.value = e.id;
    opt.textContent = `${e.nombre} (${e.colegioNombre})`;
    selectNota.appendChild(opt);
  });
}

async function loadPeriodos() {
  const res = await fetch(`${apiBase}/Periodo`);
  const data = await res.json();
  const tbody = document.querySelector("#tabla-periodos tbody");
  tbody.innerHTML = "";
  const selectNota = document.getElementById("nota-periodoId");
  selectNota.innerHTML = '<option value="">Seleccione periodo</option>';
  data.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${p.id}</td><td>${p.nombre}</td><td>${p.porcentaje}</td>`;
    tbody.appendChild(tr);
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = `${p.nombre} (${p.porcentaje}%)`;
    selectNota.appendChild(opt);
  });
}

async function loadNotas() {
  const res = await fetch(`${apiBase}/Nota`);
  const data = await res.json();
  const tbody = document.querySelector("#tabla-notas tbody");
  tbody.innerHTML = "";
  data.forEach(n => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${n.id}</td>
      <td>${n.score}</td>
      <td>${n.estudianteNombre}</td>
      <td>${n.asignaturaNombre}</td>
      <td>${n.periodoNombre}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Inicializar
loadColegios();
loadAsignaturas();
loadEstudiantes();
loadPeriodos();
loadNotas();
