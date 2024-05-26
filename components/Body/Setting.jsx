import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Footer } from "../index";

const Setting = ({ notifyError, notifySuccess, axios }) => {
  const [displayImg, setDisplayImg] = useState("");
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    setUserDetails(user);
  }, []);

  const [user, setUser] = useState({
    name: "",
    userName: "",
    walletAddress: "",
    privateKey: "",
    image: displayImg,
    biography: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const saveUser = () => {
    const { name, userName, walletAddress, privateKey, image, biography } =
      user;
    if (
      !name ||
      !userName ||
      !walletAddress ||
      !privateKey ||
      !image ||
      !biography
    )
      return notifyError("Provide all the details!");

    localStorage.setItem("userProfile", JSON.stringify(user));
    notifySuccess("Profile Updated Successfully!");
  };

  const uploadToInfura = async (file) => {
    notifySuccess("Uploading File");
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key: "61b9dcd67a0b6d748bd1",
            pinata_secret_api_key:
              "44b7d25d5a0ceee7de804fa7ee2739ce4191258cf1dad0f44c55e74387ada746",
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        setUser({ ...user, image: ImgHash });
        setDisplayImg(ImgHash);
        notifySuccess("Uploaded Successfully");
      } catch (error) {
        notifyError("Unable to upload image to pinata!");
        console.log(error);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToInfura(acceptedFile[0]);
  });

  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    onDrop,
    maxSize: 500000000,
  });

  return (
    <div className="techwave_fn_content">
      <div className="techwave_fn_page">
        <div className="techwave_fn_user_setting_page">
          <div className="techwave_fn_pagetitle">
            <h2 className="title">Settings</h2>
          </div>

          <div className="container small">
            <div className="techwave_fn_user_settings">
              <form>
                <div className="user__settings">
                  <div className="settings_left">
                    <label htmlFor="input" className="fn__upload">
                      {displayImg == "" ? (
                        <span className="upload_content" {...getRootProps()}>
                          <span className="title">Drag & Drop an Image</span>
                          <span className="fn__lined_text">
                            <span className="line"></span>
                            <span className="text">Ok</span>
                            <span className="line"></span>
                          </span>

                          <span className="title">Browse</span>
                          <span className="desc">
                            Support JPG, JPGE, and PNG
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            {...getInputProps()}
                          />
                        </span>
                      ) : (
                        <img src={displayImg} className="preview_img" alt="" />
                      )}
                    </label>
                  </div>

                  <div className="settings_right">
                    <div className="item">
                      <label htmlFor="name" className="input_label">
                        Name
                      </label>

                      <div className="input_item">
                        <input
                          type="text"
                          className="input"
                          placeholder={userDetails?.name || "update"}
                          onChange={(e) => handleFormFieldChange("name", e)}
                        />
                      </div>
                    </div>

                    <div className="item">
                      <label htmlFor="name" className="input_label">
                        Username
                      </label>

                      <div className="input_item">
                        <input
                          type="text"
                          className="input"
                          placeholder={userDetails?.userName || "update"}
                          onChange={(e) => handleFormFieldChange("userName", e)}
                        />
                      </div>
                    </div>

                    <div className="item">
                      <label htmlFor="name" className="input_label">
                        Wallet Address
                      </label>

                      <div className="input_item">
                        <input
                          type="text"
                          className="input"
                          placeholder="WALLET ADDRESS"
                          onChange={(e) =>
                            handleFormFieldChange("walletAddress", e)
                          }
                        />
                      </div>
                    </div>

                    <div className="item">
                      <label htmlFor="name" className="input_label">
                        Private Key
                      </label>

                      <div className="input_item">
                        <input
                          type="text"
                          className="input"
                          placeholder={userDetails?.privateKey || "update"}
                          onChange={(e) =>
                            handleFormFieldChange("privateKey", e)
                          }
                        />
                      </div>
                    </div>

                    <div className="item">
                      <label htmlFor="name" className="input_label">
                        Biography
                      </label>

                      <div className="input_item">
                        <textarea
                          type="text"
                          className="input"
                          placeholder={userDetails?.biography || "update"}
                          onChange={(e) =>
                            handleFormFieldChange("biography", e)
                          }
                        />
                      </div>
                    </div>

                    <div className="item">
                      <div>
                        <a
                          onClick={() => saveUser()}
                          className="techwave_fn_button"
                        >
                          Save Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Setting;
