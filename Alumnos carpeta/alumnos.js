let url = "http://192.168.1.52:3000/api/alumnos";

/*
$.get(function() {

}, "json")
*/

function llamar_a_datos() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencode");

  xhr.onload = function () {
    console.log(JSON.parse(xhr.responseText));
  };
  xhr.send();
}

//llamar_a_datos();

const d = document;
$table = d.querySelector("#crudtable"),
$form = d.querySelector("#crudfrom"),
$title = d.querySelector("#crudtitle"),
$template = document.querySelector("#crudtemplate")
$fragment = d.createDocumentFragment();
console.log("template", $template);


const getAll = async () => {
  //try {
    let res = await axios.get(url);
      const datos = await res.data;
      console.log(datos)

    console.log("Resultados", datos);
    let bodytable = d.getElementById('crudtable');
    datos.forEach((el) => {
      console.log('nombre: ', el.firstname);
      let newRow = bodytable.insertRow(-1);

      let newCell = newRow.insertCell(-1);
      let newText = document.createTextNode(el.firstname);
      newCell.appendChild(newText);

      let newCell2 = newRow.insertCell(-1);
      let newText2 = document.createTextNode(el.middlename);
      newCell2.appendChild(newText2);
    
      let newCell3 = newRow.insertCell(-1);
      let newText3 = document.createTextNode(el.lastname);
      newCell3.appendChild(newText3);

      let newCell4 = newRow.insertCell(-1);
      let newText4 = document.createTextNode(el.phonenumber);
      newCell4.appendChild(newText4);

      let newCell5 = newRow.insertCell(-1);
      let newText5 = document.createTextNode(el.birthdate);
      newCell5.appendChild(newText5);

      let newCell6 = newRow.insertCell(-1);
      let newText6 = document.createTextNode(el.weight);
      newCell6.appendChild(newText6);

      let newCell7 = newRow.insertCell(-1);
      let newText7 = document.createTextNode(el.sex);
      newCell7.appendChild(newText7);
      
      //$template.querySelector(".nombre").textContent = el.firstname;
      /*$template.querySelector(".segundo nombre").textContent = el.middlename;
      $template.querySelector(".apellido").textContent = el.lastname;
      $template.querySelector(".numero_de_telefono").textContent = el.phonenumber;
      $template.querySelector(".nacimiento").textContent = el.birthdate;
      $template.querySelector(".peso").textContent = el.weight;
      $template.querySelector(".sexo").textContent = el.sexo;
      $template.querySelector(".").textContent = el.;
      $template.querySelector(".edit").dataset.id = el.id;
      $template.querySelector(".edit").dataset.nombre = el.nombre;
      $template.querySelector(".edit").dataset.segundo nombre = el.segundo nombrw;
      $template.querySelector(".edit").dataset.apellido = el.apellido;
      $template.querySelector(".edit").dataset.edad = el.edad;
      $template.querySelector(".edit").dataset.sexo = el.sexo;
      $template.querySelector(".delete").dataset.id = el.id;

      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
      */
    });
/*
  } catch (err) {
    let message = err.statusText || "ocurrio un error";
    //$table.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}:${message}</b></p>`);
    console.log(err.status, message)
  }
  */
}

function cargarCelda(el){
  let newCell2 = newRow.insertCell(-1);
  let newText2 = document.createTextNode(el.lastname);
  newCell2.appendChild(newText2);  
}

d.addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", async (e) => {
  if (e.target === $form) {
    e.preventDefault();

    if (!e.target.id.value) {
      //Create - POST
      try {
        let options = {
            method: "POST",
            Headers: {
              "content-type": "application/json; charset=utf-8"
            },
            data: JSON.stringify({
              nombre: e.target.nombre.value,
              apellido: e.target.apellido.value,
              edad: e.target.edad.value,
              sexo: e.target.sexo.value
            })
          },
          res = await axios("http://192.168.1.52:3000/api/alumnos", options),
          json = await res.data;

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrio un error";
        $form.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}:${message}</b></p>`);
      }
    } else {
      //Update - PUT
      try {
        let options = {
            method: "PUT",
            Headers: {
              "content-type": "application/json; charset=utf-8",
            },
            data: JSON.stringify({
              nombre: e.target.nombre.value,
              apellido: e.target.apellido.value,
              edad: e.target.edad.value,
              sexo: e.target.sexo.value
            }),
          },
          res = await axios(`http://192.168.1.52:3000/api/alumnos/${e.target.id.value}`,options),
          json = await res.json();

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrio un error";
        $form.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}:${message}</b></p>`);
      }
    }
  }
});

d.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    $title.textContent = "editar Santo";
    $form.nombre.value = e.target.dataset.nombre;
    $form.apellido.value = e.target.dataset.apellido;
    $form.edad.value = e.target.dataset.edad;
    $form.sexo.value = e.target.dataset.sexo;
    $form.id.value = e.target.dataset.id;
  }

  if (e.target.matches(".delete")) {
    let isDelete = confirm(`¿estás seguro de eliminar id ${e.target.dataset.id}?`);

    if (isDelete) {
      //Delete - DELETE
      try {
        let options = {
            method: "DELETE",
            Headers: {
              "content-type": "application/json; charset=utf-8"
              }
            },
              res = await axios(`http://192.168.1.52:3000/api/alumnos/${e.target.dataset.id}`,options),
              json = await res.json();

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrio un error";
        alert(`Error ${err.status}:${message}`);
      }
    }
  }
});
