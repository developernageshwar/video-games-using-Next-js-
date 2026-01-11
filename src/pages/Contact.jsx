import React from "react";
import Navbar from "../components/layout/Navbar";
import Input from "../components/common/Input";
import TextArea from "../components/common/TextArea";
import Button from "../components/common/Button"; 
import styles from "./Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", formData.name);
    console.log("Message:", formData.message);
    alert("Message sent successfully!");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>GET IN TOUCH</h1>
          <p>
            Trysail transom furl Sea Legs scallywag Jack Ketch chandler
            mizzenmast reef sails skysail. Shiver me timbers loot bucko belaying
            pin Sea Legs boom gunwalls booty jury mast fore.
          </p>
        </div>

        <div className={styles.formCard}>
          <h3>Contact Form</h3>
          <form onSubmit={handleSubmit}>
            <div className={styles.row}>
              <Input
                label="Name *"
                id="name"
                name="name"
                className={styles.inputGroup}
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email Address *"
                type="email"
                id="email"
                name="email"
                className={styles.inputGroup}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.group}>
              <TextArea
                label="Message *"
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.actions}>
              <Button type="submit" variant="primary">
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
