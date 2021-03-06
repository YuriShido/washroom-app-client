import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios'
import './EditModal.scss'

const customStyles = {
    overlay: {
        zIndex: "100",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: "1rem",
        fontFamily: "'Quicksand', sans-serif"
        // margin: "2rem"
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function EditModal({ setIsOpen, modalIsOpen, chose }) {

    const [name, setName] = useState(chose.name);
    const [discription, setDiscription] = useState(chose.discription)
    const [rate, setRate] = useState(chose.rate)
    const [openTime, setOpenTime] = useState(chose.openTime)


    // console.log("propsFromchose:", chose)

    function closeModal() {
        setIsOpen(false);
    }
    const submitHandler = async (e) => {
        e.preventDefault()

        const time = new Date()
        // console.log('name:', name, "discription:", discription, " coodinate:", chose.coordinate.lat, chose.coordinate.lng, rate, openTime, time)

        try {

            const updateWashroom = {
                name,
                discription,
                coordinate: { lat: chose.coordinate.lat, lng: chose.coordinate.lng },
                openTime,
                rate,
                time: time

            }

            await axios.post(`${process.env.REACT_APP_SERVER_URL}washroom/${chose._id}`, updateWashroom)
            alert("Washroom Data Updated. Thank you!")
            closeModal();
        } catch (err) {
            console.log("Error: ", err.response)
        }
    }

    const deleteHandler = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}washroom/${chose._id}`)
            const checkDelete = window.confirm('Are you sure to delete this wasroom data?')
            if (checkDelete) closeModal()
        } catch (err) {
            console.log("Error: ", err.response)
        }
    }

    return (
        <div id="EditModal" className="editModal">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {/* <button onClick={closeModal}>close</button> */}
                <i className="fas fa-times closeBtn" onClick={closeModal} ></i>
                <h2 className="title">Update washroom data</h2>
                <div className="washroom-container">

                    <form className="addForm" onSubmit={submitHandler}>
                        <label htmlFor='placeName'>Place name</label>
                        <input type='text'
                            className="addInfo"
                            id='placeName'
                            placeholder={chose.name}
                            onChange={(e) => setName(e.target.value)} />
                        <label htmlFor='discription'>Discription</label>
                        <select id='discription' className="addInfo" name='discription'
                            // placeholder={chose.discription} 
                            defaultValue={chose.discription}
                            onChange={(e) => setDiscription(e.target.value)}>
                            {/* <option value="" selected disabled hidden>Choose here</option> */}
                            <option value="Publish washroom">Public washroom</option>
                            <option value="Portable toilet">Portable toilet</option>
                            <option value="Washroom in the store">Washroom in the store</option>
                            <option value="Customer only in the Store">Customer only in the store</option>
                        </select>
                        <label htmlFor='OpenTime'>Available time</label>
                        <input type='text'
                            id='openTime'
                            className="addInfo"
                            placeholder={chose.openTime}
                            onChange={(e) => setOpenTime(e.target.value)} />
                        <label htmlFor='rate'>Clean rate(0-5)</label>
                        <input type='range'
                            id='rate'
                            className="addInfo range"
                            min="0" max="5"
                            placeholder={chose.rate}
                            onChange={(e) => setRate(e.target.value)} />
                        <div className="btn-in-edit">
                            <input className="submit" type='submit' value='Update washroom' />

                            <button className="delete" onClick={deleteHandler}><i className="fas fa-trash-alt"></i> Delete</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

// ReactDOM.render(<App />, );
export default EditModal