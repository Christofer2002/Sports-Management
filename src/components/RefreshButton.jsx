import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

/**
 * RefreshButton Component
 * 
 * This component renders a button that, when clicked, triggers a refresh action.
 * It displays a tooltip on hover to indicate its purpose.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.refreshList - The function to be called when the button is clicked to refresh the list.
 * 
 * @returns {JSX.Element} The rendered RefreshButton component.
 */
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
