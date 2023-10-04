const URL = "https://apiservice-u435.onrender.com"

export async function getPreguntes() {
  return fetch(URL+'/getPreguntes')
  }

  //Afegir Pregunta
export async function postData(data = {}) {
    return fetch(URL+'/afegirPregunta', {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    })
  }

  //Update Pregunta
export async function putData( data = {}) {
    return fetch(URL +'/update/'+data.id, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    })
  }

  //Delete Pregunta
export async function deleteData(id) {
    return fetch(URL+'/delete/'+id, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer"
    })
  }
  //Reseteo de muestra
export async function resetData(){
  return fetch("https://apiservice-u435.onrender.com/formatPreguntes", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: ""
      })
}