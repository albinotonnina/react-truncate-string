const resizeWindow = async (width, height) => {
  await page.setViewport({height, width})

  // Window frame - probably OS and WM dependent.
  height += 85

  // Any tab.
  const {
    targetInfos: [{targetId}]
  } = await browser._connection.send('Target.getTargets')

  // Tab window.
  const {windowId} = await browser._connection.send(
    'Browser.getWindowForTarget',
    {targetId}
  )

  // Resize.
  return await browser._connection.send('Browser.setWindowBounds', {
    bounds: {height, width},
    windowId
  })
}

export default resizeWindow
