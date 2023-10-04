<script>
import { getPreguntes, postData, putData, deleteData, resetData } from './communicationsManager';

export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      count: 0,
      edit: {
        id: "",
        nom: "",
        resposta1: "",
        resposta2: "",
        resposta3: "",
        resposta4: "",
        resposta_correcta: "",
        URLImage: ""
      },
      add: {
        nomPeli: '',
        resposta1: '',
        resposta2: '',
        check_resposta: '',
        resposta3: '',
        resposta4: '',
        addURLImage: ''
      },
      erase: {
        id: '',
        pregunta: '',
        respostes: [{
          id: 1,
          any: ''

        }, {
          id: 2,
          any: ''
        }, {
          id: 3,
          any: ''
        }, {
          id: 4,
          any: ''
        }
        ],
        resposta_correcta: '',
        imatge: ''
      },
      JSONpreguntes: {}
    }
  },
  created() {
    this.recibirPreguntes()
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    eliminarPregunta(current_film) {
      this.erase = current_film;
    },
    editarPregunta(current_film) {

      this.edit.id = current_film.id;
      this.edit.nom = current_film.pregunta;
      this.edit.resposta1 = current_film.respostes[0].any;
      this.edit.resposta2 = current_film.respostes[1].any;
      this.edit.resposta3 = current_film.respostes[2].any;
      this.edit.resposta4 = current_film.respostes[3].any;
      this.edit.resposta_correcta = current_film.resposta_correcta;
      this.edit.URLImage = current_film.imatge;

    },
    recibirPreguntes() {
      getPreguntes().then((response) => response.json())
        .then((data) => {
          this.JSONpreguntes = data;
        });
    },
    afegirPregunta() {
      postData(this.add).then(() => {
        this.recibirPreguntes()

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
    },
    updatePregunta() {
      putData(this.edit).then(() => {
        this.recibirPreguntes()
      });
    },
    deletePregunta() {
      deleteData(this.erase.id).then(() => {
        this.recibirPreguntes()
      });
    },
    formatearArchivos() {
      resetData().then(() => {
        this.recibirPreguntes();
      });
    }

  }

}
</script>

<template>
  <!--NavBar-->
  <nav class="navbar bg-body-tertiary fixed-top">
    <div class="container-fluid">
      <a class="btn btn-outline-success" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
        aria-controls="offcanvasExample">
        Añadir Pregunta
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!--Offcanvas Start-->
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Añadir Pregunta</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body mb-3">

          <div class="mb-3">
            <label class="form-label">Nombre pelicula</label>
            <input type="text" id="nomPeli" name="nomPeli" class="form-control" v-model="add.nomPeli">
          </div>
          <div class="mb-3">
            <label class="form-label">Respostes</label>
            <div class="input-group mb-3">
              <input type="text" id="resposta1" name="resposta1" class="form-control" placeholder="Resposta 1"
                v-model="add.resposta1">
              <div class="input-group-text">
                <input type="radio" id="check_resposta1" name="check_resposta" value="1" class="form-check-input mt-0"
                  v-model="add.check_resposta">
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="text" id="resposta2" name="resposta2" class="form-control" placeholder="Resposta 2"
                v-model="add.resposta2">
              <div class="input-group-text">
                <input type="radio" id="check_resposta2" name="check_resposta" value="2" class="form-check-input mt-0"
                  v-model="add.check_resposta">
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="text" id="resposta3" name="resposta3" class="form-control" placeholder="Resposta 3"
                v-model="add.resposta3">
              <div class="input-group-text">
                <input type="radio" id="check_resposta3" name="check_resposta" value="3" class="form-check-input mt-0"
                  v-model="add.check_resposta">
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="text" id="resposta4" name="resposta4" class="form-control" placeholder="Resposta 4"
                v-model="add.resposta4">
              <div class="input-group-text">
                <input type="radio" id="check_resposta4" name="check_resposta" value="4" class="form-check-input mt-0"
                  v-model="add.check_resposta">
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Imagen URL</label>
            <input type="text" id="addURLImage" name="addURLImage" class="form-control" v-model="add.addURLImage">
          </div>
          <button class="btn btn-primary" data-bs-dismiss="offcanvas" @click="this.afegirPregunta()">Enviar</button>
        </div>
      </div>
      <!--Offcanvas End-->
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Inicio</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Estadísticas
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" @click="formatearArchivos()" href="#">Formatear archivos</a></li>
              </ul>
            </li>
          </ul>
          <form class="d-flex mt-3" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  </nav>
  <!--Cards-->
  <div class="row" style="margin-top: 4rem; margin-left: 1rem; margin-right: 0;">
    <div class="card mb-3 me-3" style="max-width: 540px; padding-left: 0;" v-for="current_film in JSONpreguntes.preguntes"
      v-if="JSONpreguntes.preguntes">
      <div class="row g-0">
        <div class="col-md-4">
          <img :src=current_film.imatge :alt="current_film.pregunta" style="height: 100%; width: 100%;"
            class="img-fluid rounded-start">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ current_film.pregunta }}</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="respuesta in current_film.respostes">
                <p class="card-text">
                  {{ respuesta.any }}
                </p>
              </li>
            </ul>
            <button class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal"
              href="#collapseExample" @click="editarPregunta(current_film)">Editar pregunta</button>
            <button class="btn btn-outline-danger" data-bs-toggle="modal" @click="eliminarPregunta(current_film)"
              data-bs-target="#deleteModal">Eliminar pregunta</button>
          </div>
        </div>
      </div>

    </div>
  </div>
  <!-- Update Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Editar {{ edit.nom }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>

            <div class="mb-3">
              <label class="form-label">Nombre pelicula</label>
              <input type="text" id="editNomPeli" name="nomPeli" v-model="edit.nom" class="form-control" required>
            </div>

            <div class="mb-3">
              <label class="form-label">Respostes</label>
              <div class="input-group mb-3">
                <input type="text" id="editResposta1" name="resposta1" v-model="edit.resposta1" class="form-control"
                  placeholder="Resposta 1" required>
                <div class="input-group-text">
                  <input type="radio" id="editCheck_resposta1" name="check_resposta" value="1"
                    v-model="edit.resposta_correcta" class="form-check-input mt-0">
                </div>
              </div>
              <div class="input-group mb-3">
                <input type="text" id="editResposta2" name="resposta2" v-model="edit.resposta2" class="form-control"
                  placeholder="Resposta 2" required>
                <div class="input-group-text">
                  <input type="radio" id="editCheck_resposta2" name="check_resposta" value="2"
                    v-model="edit.resposta_correcta" class="form-check-input mt-0">
                </div>
              </div>
              <div class="input-group mb-3">
                <input type="text" id="editResposta3" name="resposta3" v-model="edit.resposta3" class="form-control"
                  placeholder="Resposta 3" required>
                <div class="input-group-text">
                  <input type="radio" id="editCheck_resposta3" name="check_resposta" value="3"
                    v-model="edit.resposta_correcta" class="form-check-input mt-0">
                </div>
              </div>
              <div class="input-group mb-3">
                <input type="text" id="editResposta4" name="resposta4" v-model="edit.resposta4" class="form-control"
                  placeholder="Resposta 4" required>
                <div class="input-group-text">
                  <input type="radio" id="editCheck_resposta4" name="check_resposta" value="4"
                    v-model="edit.resposta_correcta" class="form-check-input mt-0">
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Imagen URL</label>
              <input type="text" id="editURLImage" name="URLImage" v-model="edit.URLImage" class="form-control" required>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button @click="updatePregunta()" data-bs-dismiss="modal" class="btn btn-primary">Editar cambios</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <!--Delete Modal-->
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="eliminarModalLabel">Eliminar</h1>
        </div>
        <div class="modal-body">
          <div class="toast-body">De verdad desea eliminar {{ this.erase.pregunta }}? <br>Ten en cuenta que esta acción es
            irreversible</div><br>
          <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancelar</button>
          <button class="btn btn-danger" data-bs-dismiss="modal" @click="deletePregunta()">Eliminar
            pregunta</button>
        </div>
      </div>
    </div>
  </div>
</template>