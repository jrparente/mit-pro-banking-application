import Card from "react-bootstrap/Card";

export default function CustomCard(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }

  return (
    <Card className={classes()}>
      <Card.Header>
        <h5>{props.header}</h5>
      </Card.Header>
      <Card.Body>
        {props.title && <Card.Title>{props.title}</Card.Title>}
        {props.text && <Card.Text>{props.text}</Card.Text>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </Card.Body>
    </Card>
  );
}
