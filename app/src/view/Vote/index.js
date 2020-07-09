import React, { useEffect, useState } from "react";
import { candidates, fetchAPI } from "../../tools";
import firebase from "firebase/app";
import "firebase/database";
import { Row, Col, Card, Button, Result, Spin } from "antd";
import { FileSyncOutlined } from "@ant-design/icons";

const Vote = ({ match }) => {
  const [candidateInfo, setCandidateInfo] = useState({});
  // const [voterData, setVoterData] = useState([]);
  const [voteBox, setVoteBox] = useState({
    desc: "พร้อม",
    title: "พร้อมดำเนินการ",
  });

  const [content, setContent] = useState(
    <Result
      icon={<FileSyncOutlined />}
      title="คุณสามารถลงคะแนนได้เพียง 1 ครั้ง!"
      extra={
        <Button type="primary" size="large" onClick={async () => startVerify()}>
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
  }, [match.params.reference]);

  const startVerify = async () => {
    const fbdata = await getFirebase();
    // setVoterData(fbdata);
    setVoteBox({
      title: "กรุณาวางนิ้วลงบนเครื่องสแกน",
      desc: "กำลังดำเนินการ",
    });
    const result = await fetchAPI("GET", "/getfinger");
    if (result.success) {
      setVoteBox((prev) => ({ ...prev, title: "กำลังตรวจสอบลายนิ้วมือ" }));
      const verify = await fetchAPI("POST", "/verifyfinger", {
        current_finger: result.data,
        list_finger: mergeFinger(fbdata),
      });
      if (verify.success) {
        setVoteBox((prev) => ({ ...prev, title: "กำลังตรวจสอบสิทธิ" }));
        if (!findIsVote(fbdata, verify.data)) {
          setVoteBox({
            title: "ยืนยันตัวตนสำเร็จ",
            desc: "พร้อม",
          });
        } else {
          setVoteBox({
            title: "คุณได้ทำการลงคะแนนไปแล้ว",
            desc: "พร้อม",
          });
        }
        console.log(verify);
      } else {
        setVoteBox({ title: "ลายนิ้วมือไม่ถูกต้อง", desc: "พร้อม" });
      }
    } else {
      setVoteBox({ title: "พบข้อผิดพลาด", desc: "พร้อม" });
    }
  };

  const getFirebase = async () => {
    // firebase.database().ref("/").set({ val: 0 });
    let ref = firebase.database().ref("/");
    const snapshot = await ref.once("value");
    const data = snapshot.val();
    const userdata = Object.keys(data).map((key) => {
      return { secret: key, finger: data[key].finger, isVote: data[key].vote };
    });
    return userdata;
  };

  const mergeFinger = (voter) => {
    const finger = voter.map((item) => {
      return item.finger;
    });
    return finger.join(",");
  };

  const findIsVote = (voter, finger) => {
    const current_voter = voter.find((e) => e.finger === finger);
    return current_voter.isVote;
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
