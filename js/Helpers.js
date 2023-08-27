export default class Helpers {
    /**
     * Permite asignar elementos a una lista desplegable a partir de un array de objetos
     * @param {String} selector es el Selector CSS que permite llegar a la lista despelgable
     * @param {array} items ses el array de elementos utilizado para poblar el select
     * @param {String} value es la clave o id
     * @param {String} text es el nombre del atributo
     * @param {String} firstOption Recibe el 'placeholder' de la lista seleccionable
     * 
     * @returns {list} retorna la lista con los elementos asignados
     */
    static populateSelectList = (
        selector, items = [], value = '', text = '', firstOption = ''
    ) => {
        let list = document.querySelector(selector)
        list.options.length = 0
        if (firstOption) {
            list.add(new Option(firstOption, ''))
        }
        items.forEach(item => list.add(new Option(item[text], item[value])))
        return list
    }
    /**
     * Permite obtener de una lista seleccionable su ínidice, su valor y su texto
     * @param {String} selector Es el selector CSS que permite seleccionar la lista
     * @returns  retorna un objeto con el índice dado, valor y texto
     */
    static selectedItemList = (selector) => {
        const list = document.querySelector(selector);
        const item = list.options[list.selectedIndex];

        return {
            selectedIndex: list.selectedIndex,
            value: item.value,
            text: item.text,
        };
    };

    /**
     * Permite obtener la lista de los buttons radio con su respectivo estado
     * @param {String} selector Es el selector CSS que permite seleccionar el grupo de radio buttons o checkbox
     * @returns retorna un array de objetos con información sobre el estado de selección
     */
    static getItems = (selector) => {
        const items = document.querySelectorAll(selector);
        return [...items].map((item) => {
            return { value: item.value, checked: item.checked };
        });
    };

    /**
     * Permite conocer el valor del button radio seleccionado
     * @param {String} selector Es el selector CSS que permite seleccionar en grupo de radio buttons
     * @returns {String} retorna el value del button radio seleccionado
     */
    static selectedRadioButton = (selector) => {
        const radio = document.querySelector(selector + ":checked");
        return radio ? radio.value : radio;
    };
    /**
     * Permite cargar páginas en un contenedor a partir de una URL dada
     * @param {String} url ruta de la página que queremos cargar
     * @param {String} container contenedor en el que queremos cargar la página
     * @returns {json}  retorna la respuesta en su formato json
     */

    static fetchData = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `${response.status} - ${response.statusText}, 
               al intentar acceder al recurso '${response.url}'`
            );
        }

        return await response.json();
    };

    static loadPage = async (url, container) => {
        try {
            const element = document.querySelector(container);

            if (!element) {
                throw new Error(`El selector '${container}' no es válido`);
            }

            const response = await fetch(url);
            // console.log(response);
            if (response.ok) {
                const html = await response.text();
                element.innerHTML = html;
                return element; // para permitir encadenamiento
            } else {
                throw new Error(
                    `${response.status} - ${response.statusText}, al intentar
                   acceder al recurso '${response.url}'`
                );
            }
        } catch (e) {
            console.log(e);
        }
    };
}