import React, { useEffect, useState } from "react";
import { candidates } from "../../tools";
import { Row, Col, Card, Button } from "antd";

const Vote = ({ match }) => {
  const [candidateInfo, setCandidateInfo] = useState({});

  useEffect(() => {
    const _info = candidates.find((e) => e.name_en === match.params.reference);
    if (_info) {
      setCandidateInfo(_info);
    }
  }, [match]);
  return (
    <div className="p-3 bg-white d-flex flex-column justify-content-center align-items-center h-100">
      <h3>คุณกำลังจะลงคะแนนให้กับ : {candidateInfo.name}</h3>
      <Button type="primary" size="large">
        กดที่นี่เพื่อเริ่มลงคะแนน
      </Button>
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
          <Card style={{ width: "60%", borderRadius: "5px" }}></Card>
        </Col>
      </Row>
    </div>
  );
};

export default Vote;
