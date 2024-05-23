// segundopage.jsx
import React, { useState } from 'react';
import './segundopage.css';
import { Navbar } from "../menu/navbar";
import { Footer } from "../footer/footer";

const Segundopage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div>
        <Navbar />
        <div className="containerrmp">
            <div className="contentmp">
                <h1 className="tituloTienda">Combos de Películas</h1>
                <br/>
                <div className="pricing-page">
                  <div className="card-container">
                    <div className="card">
                      <img className="imgTienda" src="https://www.granma.cu/file/img/2020/08/medium/f0175895.jpg" alt="Combo Básico" />
                      <div className="container">
                        <h2 className='subtituloCombo'>Combo Básico</h2>
                        <p className="description">Incluye películas de acción y comedia.</p>
                        <p className="price">Precio: $9.99</p>
                      </div>
                    </div>

                    <div className="card">
                      <img className="imgTienda" src="https://poptv.orange.es/wp-content/uploads/sites/3/2023/01/blue-monday-peliculas-alegrarte-dia-scaled.jpg" alt="Combo Estándar" />
                      <div className="container">
                        <h2 className='subtituloCombo'>Combo Estándar</h2>
                        <p className="description">Incluye películas de acción, comedia y drama.</p>
                        <p className="price">Precio: $14.99</p>
                      </div>
                    </div>

                    <div className="card">
                      <img className="imgTienda"src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEW3wVfsEO1Ufl32a8DsrfiJ4Akpg1U5MbRArFaQmtVQ&s" alt="Combo Premium" />
                      <div className="container">
                        <h2 className='subtituloCombo'>Combo Premium</h2>
                        <p className="description">Incluye películas de acción, comedia, romance y drama.</p>
                        <p className="price">Precio: $19.99</p>
                      </div>
                    </div>
                  </div>
                  <br/>
                  <br/>

                  <h1 className="tituloTienda">Selecciona tu plan</h1>
                  <div className="plan-container">
                    
                    <div className="plan">
                      <h3 className='subtituloCombo'>Plan Mensual</h3>
                      <p className="price">Precio: $9.99</p>
                      <button className='btnTienda' onClick={() => handleSelectPlan('Mensual')}>Seleccionar</button>
                    </div>
                    <div className="plan">
                      <h3 className='subtituloCombo'>Plan Anual</h3>
                      <p className="price">Precio: $99.99</p>
                      <button className='btnTienda' onClick={() => handleSelectPlan('Anual')}>Seleccionar</button>
                    </div>
                  </div>
                  <br/>
                  {selectedPlan && <p className='description'>Plan seleccionado: {selectedPlan}</p>}
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
};

export { Segundopage };
