import React, { useState } from 'react';
import { domainName } from '../../config/urls';

const Screenshot = () => {
    const [message, setMessage] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [link, setLink] = useState('');
    const [isMessageInvalid, setIsMessageInvalid] = useState(false);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        setIsMessageInvalid(false)
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const copyLink = () => {
        const linkInput = document.getElementById('linkInput');
        linkInput.select();
        document.execCommand('copy');
        showPopupMessage('Copied!');
    };

    const sendData = () => {
        if (!message.trim()) {
            setIsMessageInvalid(true)
            setMessage('');
            showPopupMessage(`Message can't be empty`);
            return;
        }

        if (!imageFile) {
            alert('Please select an image.');
            return;
        }

        setShowLoader(true);

        const reader = new FileReader();
        reader.onload = function () {
            const base64Image = reader.result.split(',')[1];
            const data = {
                id: message.toLowerCase().trim(),
                screenshot: base64Image,
            };

            fetch(`${domainName}/ss/set`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    setShowLoader(false);
                    showPopupMessage('Message sent successfully with an Image!');
                    setLink(`${window.location.origin}/ss/${encodeURIComponent(data.result.id)}`);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setShowLoader(false);
                });
        };

        reader.readAsDataURL(imageFile);
    };

    const showPopupMessage = (message) => {
        setPopupMessage(message);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 1500);
    };

    return (
        <div style={styles.top}>
        <div style={styles.main}>
            {showLoader && <div style={styles.loader} id="loader"></div>}
            <form id="apiForm" style={styles.form}>
                <label htmlFor="message">Enter Message:</label>
                <input
                    type="text"
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Enter Message"
                    required
                    style={{ ...styles.input, borderColor: isMessageInvalid && message=="" ? '#ff0000' : '#ccc' }}
                />

                <label htmlFor="image">Select Image:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    style={styles.input}
                />

                <button type="button" onClick={sendData} style={styles.button}>
                    Send
                </button>
            </form>

            {showPopup && (
                <div id="successPopup" style={styles.popup}>
                    <p>{popupMessage}</p>
                </div>
            )}

            {link && (
                <div id="linkBox" style={styles.linkBox}>
                    <label htmlFor="linkInput">Share link:</label>
                    <input type="text" id="linkInput" value={link} readOnly style={styles.input} />
                    <button onClick={copyLink} style={styles.button}>
                        Copy Link
                    </button>
                </div>
            )}
            </div>
            </div>
    );
};

const styles = {
    top: {
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: 'rgb(76, 195, 224)',
    },
    main: {
        padding: '20px',
        maxWidth: '400px',
        width: '100%',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        margin: '0px auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        maxWidth: 'calc(100% - 40px)',
        width: '100%',
        margin: '0px auto',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginBottom: '16px',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        borderRadius: '4px',
        transition: 'border-color 0.3s',
    },
    button: {
        backgroundColor: '#4caf50',
        color: '#fff',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        width: '100%',
        hover: {
            backgroundColor: '#45a049',
        },
    },
    popup: {
        display: 'block',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
    },
    linkBox: {
        display: 'block',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        maxWidth: 'calc(100% - 40px)',
        width: '100%',
        margin: '10px auto',
    },
    loader: {
        display: 'block',
        border: '16px solid #f3f3f3',
        borderTop: '16px solid #3498db',
        borderRadius: '50%',
        width: '70px',
        height: '70px',
        animation: 'spin 1s linear infinite',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default Screenshot;
