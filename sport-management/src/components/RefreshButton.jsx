import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function RefreshButton({ refreshList }) {
  const tooltip = <Tooltip id='tooltip'>Refresh</Tooltip>;

  return (
    <OverlayTrigger placement='bottom' overlay={tooltip}>
      <Button className='refreshButton' onClick={refreshList}>
        <FontAwesomeIcon icon={faRotate} className='iconSize' />
      </Button>
    </OverlayTrigger>
  );
}
