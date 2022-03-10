import React from "react";
import "antd/dist/antd.css";
import { Upload, message, Button, Progress } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import axios from "axios";
axios.defaults.withCredentials = true;

class Upload_file extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
      filseSize: 0,
      baifenbi: 0,
    };
  }
  //文件上传改变的时候
  configs = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
    onUploadProgress: (progress) => {
      console.log(progress);
      let { loaded } = progress;
      let { filseSize } = this.state;
      console.log(loaded, filseSize);
      let baifenbi = ((loaded / filseSize) * 100).toFixed(2);
      this.setState({
        baifenbi,
      });
    },
  };
  //点击上传
  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file);
    });
    this.setState({
      uploading: true,
    });
    //请求本地服务
    axios
      .post("http://127.0.0.1:5000/upload", formData, this.configs)
      .then((res) => {
        this.setState({
          baifenbi: 100,
          uploading: false,
          fileList: [],
        });
      })
      .finally((log) => {
        console.log(log);
      });
  };
  onchange = (info) => {
    if (info.file.status !== "uploading") {
      this.setState({
        filseSize: info.file.size,
        baifenbi: 0,
      });
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState((state) => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    return (
      <div style={{ width: "80%", margin: "auto", padding: 20 }}>
        <h2>{this.state.baifenbi + "%"}</h2>

        <Button
          onChange={(e) => {
            this.onchange(e);
          }}
          {...props}
        >
          <input type="file" hidden /> Click to Upload
        </Button>

        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? "Uploading" : "Start Upload"}
        </Button>
        <Progress
          style={{ marginTop: 20 }}
          status={this.state.baifenbi !== 0 ? "success" : ""}
          percent={this.state.baifenbi}
        ></Progress>
      </div>
    );
  }
}

export default Upload_file;
