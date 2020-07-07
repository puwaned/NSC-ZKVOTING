import React, { useEffect, useState } from "react";
import { candidates, fetchAPI } from "../../tools";
import { Row, Col, Card, Button, Result, Spin } from "antd";
import { FileSyncOutlined } from "@ant-design/icons";

const Vote = ({ match, firebase }) => {
  const [candidateInfo, setCandidateInfo] = useState({});
  const [voteBox, setVoteBox] = useState({
    desc: "พร้อม",
    title: "พร้อมดำเนินการ",
  });

  const [content, setContent] = useState(
    <Result
      icon={<FileSyncOutlined />}
      title="คุณสามารถลงคะแนนได้เพียง 1 ครั้ง!"
      extra={
        <Button type="primary" size="large" onClick={async () => fetchCheck()}>
          กดที่นี่เพื่อเริ่มลงคะแนน
        </Button>
      }
    />
  );

  useEffect(() => {
    const _info = candidates.find((e) => e.name_en === match.params.reference);
    if (_info) {
      setCandidateInfo(_info);
    }
    // firebase.database().ref("/").set({ val: 0 });
    let ref = firebase.database().ref("/");
    ref.on("value", (snapshot) => {
      console.log(snapshot.val());
    });
  }, [match.params.reference]);

  const fetchCheck = async () => {
    const result = await fetchAPI("GET", "/");
    console.log(result);
  };

  return (
    <div className="p-3 bg-white d-flex flex-column justify-content-center align-items-center h-100">
      <h3>คุณกำลังจะลงคะแนนให้กับ : {candidateInfo.name}</h3>

      <Row className="w-100">
        <Col xs={24} md={12} className="p-3 d-flex justify-content-center">
          <Card
            hoverable
            style={{ width: "60%", borderRadius: "5px" }}
            cover={<img alt={candidateInfo.name} src={candidateInfo.image} />}
          >
            <Card.Meta title={candidateInfo.name} description={"คะแนน : 0"} />
          </Card>
        </Col>
        <Col xs={24} md={12} className="p-3 d-flex justify-content-center">
          <Card
            style={{ width: "60%", borderRadius: "5px" }}
            cover={
              <Spin size="large" spinning={voteBox.desc === "กำลังดำเนินการ"}>
                {content}
              </Spin>
            }
          >
            <Card.Meta
              title={voteBox.title}
              description={`สถานะ : ${voteBox.desc}`}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Vote;
