import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const OperationCard: React.FC = () => {
  const [channel, setChannel] = useState<boolean>(false);
  useEffect(() => {
    //
  }, []);
  return (
    <>
      <div className="card text-center bg-dark">
        <div className="card-header">
          <h5>Operation</h5>
        </div>
        <div className="card-body">
          Card Body
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              チャンネルを変更
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default OperationCard;
