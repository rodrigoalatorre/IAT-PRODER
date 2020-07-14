# IAT (Proyecto sobre Discriminación Étnico-Racial en México)

This is an Implicit Association Test (IAT) designed to measure the strength of stereotypes on skin tones. This test was created for the [Ethnoracial Discrimination in Mexico Research Project](https://discriminacion.colmex.mx/) at [El Colegio de México](https://www.colmex.mx/en).

## Overview :mag:

This IAT is based on the [Stereotype Content Model](https://en.wikipedia.org/wiki/Stereotype_content_model) (SCM), and its main objective is to measure the strength of associations between two target categories (dark skin, white skin) and implicit stereotypes.

The server side implementation uses Python (mainly [Flask](https://flask.palletsprojects.com/en/1.1.x/)), to process user interaction, serve dynamic pages and manage sessions. It also uses MongoDB as the main storage service. The Python application exposes a [Public REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) as the main way of communication with the client side (a basic mix of plain JS, SASS, and HTML).

:warning: The IAT is by default in Spanish. However, all documentation is in English, in order to ease maintainability and overall reproducibility. 

### Customization

Although this app is not intended to be a distributable package for implementing any kind of IAT, you can still easily change some of the test's contents.

There are two JSON config files: `stimuli.config.json`, and `text.config.json`. By modifying their contents, you can define new stimuli (words & images) to be tested, or you can change the test's instructions. If you feel comfortable writing HTML and CSS, you can also easily modify the app templates.

**IAT design:** Stephanie Posadas Narvaéz.

**IAT implementation:** Pablo Reyes Moctezuma.

## Deployment and Configuration Instructions :package:

### Deploy with Docker :whale:

### Native Installation

#### Configuration

#### Testing & Debugging

## IAT Results :bar_chart:

## Build Info :construction_worker:

## Security :police_car:

## License :page_with_curl:

See LICENSE for more information on licensing.
