L = require 'leaflet'

class L.Control.ControlPanel extends L.Control
  options:
    position: 'bottomleft'
    className: 'leaflet-control-controlPanel'
    propertiesClassName: 'leaflet-control-controlPanel-properties'
    actionsClassName: 'leaflet-control-controlPanel-actions'
    expanded: true

  constructor: (@_toolbar, options = {}) ->
    L.Util.setOptions @, options

    @_toolbar.on 'enable', @addPanel, @
    @_toolbar.on 'disable', @removePanel, @

    @_actionButtons = []

  addPanel: ->
    L.DomUtil.remove @_toolbar._actionsContainer
    @_toolbar._map.addControl @

  removePanel: ->
    @_toolbar._map.removeControl @

  onAdd: (map) ->
    @_container = L.DomUtil.create 'div', @options.className
    L.DomUtil.addClass @_container, 'large' if @options.expanded
    @_propertiesContainer = L.DomUtil.create 'div', @options.propertiesClassName, @_container
    @_actionsContainer = L.DomUtil.create 'div', @options.actionsClassName, @_container

    L.DomEvent.disableScrollPropagation @_container

    @_showActionsToolbar()

    @_container

  onRemove: ->

  _createActions: (handler) ->
    container = @_actionsContainer
    buttons = @_toolbar.getActions(handler)
    l = buttons.length
    di = 0
    dl = @_actionButtons.length

    while di < dl
      @_toolbar._disposeButton @_actionButtons[di].button, @_actionButtons[di].callback
      di++
    @_actionButtons = []

    # Remove all old buttons
    while container.firstChild
      container.removeChild container.firstChild
    i = 0

    while i < l
      if 'enabled' of buttons[i] and !buttons[i].enabled
        i++
        continue

      div = L.DomUtil.create('div', 'button', container)

      button = @_toolbar._createButton(
        title: buttons[i].title
        text: buttons[i].text
        container: div
        callback: buttons[i].callback
        context: buttons[i].context)

      @_actionButtons.push
        button: button
        callback: buttons[i].callback
      i++

  _showActionsToolbar: ->
    buttonIndex = @_toolbar._activeMode.buttonIndex
    lastButtonIndex = @_toolbar._lastButtonIndex
    toolbarPosition = @_toolbar._activeMode.button.offsetTop - 1
    # Recreate action buttons on every click
    @_createActions @_toolbar._activeMode.handler
    # Correctly position the cancel button
    @_actionsContainer.style.top = toolbarPosition + 'px'
    if buttonIndex == 0
      L.DomUtil.addClass @_actionsContainer, 'leaflet-draw-actions-top'
    if buttonIndex == lastButtonIndex
      L.DomUtil.addClass @_actionsContainer, 'leaflet-draw-actions-bottom'
    @_actionsContainer.style.display = 'block'
    return

  _hideActionsToolbar: ->
    @_actionsContainer.style.display = 'none'
    L.DomUtil.removeClass @_actionsContainer, 'leaflet-draw-actions-top'
    L.DomUtil.removeClass @_actionsContainer, 'leaflet-draw-actions-bottom'
    return