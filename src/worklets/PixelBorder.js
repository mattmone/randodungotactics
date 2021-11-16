class PixelBorder {
  static get inputProperties() {
    return [];
  }

  paint(ctx, geom, props) {
    const radiusValue = Number(props.get('border-radius').toString());

    ctx.fillStyle = props.get('--border-radius-reverse-color').toString();
    ctx.roundRect(0, 0, geom.width, geom.height);
    ctx.strokeColor = props.get('border-color').toString();
    ctx.strokeWidth = props.get('border-width');
    ctx.stroke();
  }
}

registerPaint('pixel-border', PixelBorder);
