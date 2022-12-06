import React, { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const HeroForm = (props) => {
  const initialStateHeroes = {
    nombre: "",
    edad: "",
    img: "",
  };

  const [heroes, setHeroes] = useState(initialStateHeroes);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setHeroes({ ...heroes, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addOrEditHero(heroes);
    setHeroes({ ...initialStateHeroes });
  };

  const getHeroesById = async (id) => {
    const docRef = doc(db, `Heroes/${id}`);
    const docSnap = await getDoc(docRef);

    setHeroes({...docSnap.data()})
  };

  useEffect(() => {
    if (props.currentId === "") {
      setHeroes({ ...initialStateHeroes });
    } else {
      getHeroesById(props.currentId);
    }
  }, [props.currentId]);

  return (
    <form action="" className="card card-body" onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">add</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Heroe"
          name="nombre"
          onChange={handleInputChange}
          value={heroes.nombre}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="edad"
          placeholder="Edad"
          onChange={handleInputChange}
          value={heroes.edad}
        />
      </div>

      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">art_track</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="img"
          placeholder="imagen"
          onChange={handleInputChange}
          value={heroes.img}
        />
      </div>

      <button className="btn btn-primary btn-block">
          {props.currentId === "" ? "Agregar" : "Editar"}
      </button>
    </form>
  );
};

export default HeroForm;
