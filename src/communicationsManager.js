const URL = "https://apiservice-u435.onrender.com"

export async function getPreguntes() {
    const response = await fetch(URL+'/getPreguntes')
    const preguntas = await response.json();
    return preguntas;
  }

  //Afegir Pregunta
export async function postData(data = {}) {
    console.log("postdata called");
    const response = await fetch(URL+'/afegirPregunta', {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    }).then(() => {
      this.getPreguntes()

      this.toast.status = '&#129001;'
      this.toast.title = this.add.nomPeli + ' añadido'
      this.toast.msg = 'Se ha añadido correctamente'
      const toastLiveExample = document.getElementById('liveToast')
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()
      this.add = {
        nomPeli: '',
        resposta1: '',
        resposta2: '',
        check_resposta: '',
        resposta3: '',
        resposta4: '',
        addURLImage: ''
      }
    });
  }

  //Update Pregunta
export async function putData( data = {}) {
    console.log("putdata called");
    const response = await fetch(URL +'/update/'+data.id, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    }).then(() => {
      this.getPreguntes()
      this.toast.status = '&#129001;'
      this.toast.title = this.edit.nom + ' editado'
      this.toast.msg = 'Se ha editado correctamente'
      const toastLiveExample = document.getElementById('liveToast')
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()
    });

    return response.json;
  }

  //Delete Pregunta
export async function deleteData(id) {
    console.log("deletedata called");
    const response = await fetch(URL+'/delete/'+id, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer"
    }).then(() => {
      this.getPreguntes()
      this.toast.status = '&#129001;'
      this.toast.title = this.erase.pregunta + ' borrado'
      this.toast.msg = 'Se ha borrado correctamente'
      const toastLiveExample = document.getElementById('liveToast')
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()
    });
    return response.json;
  }