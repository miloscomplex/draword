class Animation extends React.Component {
  constructor() {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    const canvas = this.canvasRef.current
    const context = canvas.getContext('2d')
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  render() {
    return (
      <div>
        <h2>Hello World</h2>
      </div>
    )
  }
}
