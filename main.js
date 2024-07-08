import './style.scss'
import { setupCounter } from './counter.js'
import { createGradientBorderElement } from './src/gradient-border/gradient-border.js'

document.querySelector('#gradient-border').innerHTML = await createGradientBorderElement().then()
// setupCounter(document.querySelector('#counter'))
