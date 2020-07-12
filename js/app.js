function draw() {
  try {
    // compile the expression once
    const expression = document.getElementById("eq").value;
    const expr = math.compile(expression);

    // evaluate the expression repeatedly for different values of x
    const xValues = math.range(-100, 100, 0.5).toArray();
    const yValues = xValues.map(function (x) {
      return expr.evaluate({
        x: x,
      });
    });

    // render the plot using plotly
    const trace1 = {
      x: xValues,
      y: yValues,
      type: "scatter",
      mode: "lines",
      line: {
        color: slcCorLinha.value,
        width: 3,
      },
    };
    const data = [trace1];
    const layout = {
      plot_bgcolor: "rgb(0,0,0,0)",
    };
    Plotly.newPlot("plot", data);
  } catch (err) {
    console.error(err);
    alert(err);
  }
}

var show = function (elem) {
	elem.style.display = 'block';
};

var hide = function (elem) {
	elem.style.display = 'none';
};

var toggle = function (elem) {

	// If the element is visible, hide it
	if (window.getComputedStyle(elem).display === 'block') {
		hide(elem);
		return;
	}

	// Otherwise, show it
	show(elem);

};

const ultimoLogin = window.localStorage.getItem("ultimo_login");

if (ultimoLogin == null) {
  window.location.assign(window.location.origin + "/login.html");
}

let preferencias = window.localStorage.getItem(ultimoLogin);

const btnSalvar = document.getElementById("btn-salvar-configuracoes");
const slcCorFundo = document.getElementById("cor_background");
const slcCorFonte = document.getElementById("cor_foreground");
const slcCorLinha = document.getElementById("cor_linha");
const slcTamanhoFonte = document.getElementById("tamanho_fonte");
const btnSair = document.getElementById("btn-sair");
const btnShowHide = document.getElementById("btn-show-hide");

if (preferencias && JSON.parse(preferencias).cor_background !== null) {
  slcCorFundo.value = JSON.parse(preferencias).cor_background;
} else {
  slcCorFundo.value = "rgb(255, 255, 255)";
}
document.getElementsByTagName("body")[0].style.backgroundColor =
  slcCorFundo.value;

if (preferencias && JSON.parse(preferencias).cor_foreground !== null) {
  slcCorFonte.value = JSON.parse(preferencias).cor_foreground;
} else {
  slcCorFonte.value = "rgb(0, 0, 0)";
}
document.getElementsByTagName("body")[0].style.color = slcCorFonte.value;

if (preferencias && JSON.parse(preferencias).cor_linha !== null) {
  slcCorLinha.value = JSON.parse(preferencias).cor_linha;
} else {
  slcCorLinha.value = "rgb(0, 0, 205)";
}

if (preferencias && JSON.parse(preferencias).tamanho_fonte !== null) {
  slcTamanhoFonte.value = JSON.parse(preferencias).tamanho_fonte;
} else {
  slcTamanhoFonte.value = "1em";
}
document.getElementsByTagName("body")[0].style.fontSize = slcTamanhoFonte.value;

btnSalvar.addEventListener("click", function () {
  preferencias = {
    cor_background: slcCorFundo.value,
    cor_foreground: slcCorFonte.value,
    cor_linha: slcCorLinha.value,
    tamanho_fonte: slcTamanhoFonte.value,
  };
  window.localStorage.setItem(ultimoLogin, JSON.stringify(preferencias));
  window.location.reload();
});

btnSair.addEventListener("click", function () {
  window.localStorage.setItem("ultimo_login", null);
  window.location.assign(window.location.origin + "/login.html");
});

btnShowHide.addEventListener("click", function () {
  // Get the content
	var content = document.querySelector("#configuracoes");
	if (!content) return;

	// Toggle the content
	toggle(content);
})

draw();

document.getElementById("form").onsubmit = function (event) {
  event.preventDefault();
  draw();
};

window.onresize = draw;
