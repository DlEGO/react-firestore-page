import React, { useEffect, useState } from "react";
import HeroForm from "./HeroForm";
import { db } from "../firebase";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  query,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { doc, getDoc, deleteDoc} from "firebase/firestore";
import { Row, Col } from "react-bootstrap";

const Heroes = () => {
  const [heroes, setHeroes] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const addOrEditHero = async (heroObj) => {
    if (currentId === "") {
      await addDoc(collection(db, "Heroes"), {
        nombre: heroObj.nombre,
        edad: heroObj.edad,
        img: heroObj.img,
      }).then(() => {
        toast("New hero added", {
          type: toast.TYPE.SUCCESS,
        });
      });
    } else {
        await updateDoc(doc(db, `Heroes/${currentId}`),{
            nombre: heroObj.nombre,
            edad: heroObj.edad,
            img: heroObj.img,
        })
        console.log("hero updated")
        setCurrentId("");
    }
  };
  const onDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hero?")) {
      await deleteDoc(doc(db, `Heroes/${id}`));
      console.log("Deleted");
      toast("Hero deleted", {
        type: "error",
      });
    }
  };

  const getHeroes = async () => {
    const q = query(collection(db, "Heroes"));
    const docs = [];
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        // console.log(doc.id);
        docs.push({ ...doc.data(), id: doc.id });
      });
      setHeroes(docs);
    });
  };

  useEffect(() => {
    getHeroes();
  }, []);

  return (
    <div>
      <div className="col md-4 p-2">
        <HeroForm {...{ addOrEditHero, currentId, heroes }} />
      </div>
      <div className="card-group ">
        <Row xs={1} md={2} className="g-4">
          {heroes.map((hero) => (
            <Col >
              {
                <div className="card mb-1" >
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <img src={hero.img} alt="" height="200" width="200" />
                      <i
                        className="material-icons text-danger"
                        onClick={() => onDelete(hero.id)}
                      >
                        close
                      </i>
                      <i
                        className="material-icons"
                        onClick={() => setCurrentId(hero.id)}
                      >
                        create
                      </i>
                    </div>
                    <h4>{hero.nombre}</h4>
                    <p>{hero.edad}</p>
                  </div>
                </div>
              }
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Heroes;
