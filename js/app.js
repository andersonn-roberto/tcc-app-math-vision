function draw() {
  try {
    // compile the expression once
    const expression = document.getElementById("eq").value;
    const expr = math.compile(expression);

    // evaluate the expression repeatedly for different values of x
    const xValues = math.range(-10, 10, 0.5).toArray();
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

var btnSalvar = document.getElementById("btn-salvar-configuracoes");
var slcCorFundo = document.getElementById("cor_background");
var slcCorFonte = document.getElementById("cor_foreground");
var slcCorLinha = document.getElementById("cor_linha");

if (window.localStorage.getItem("cor_background") !== null) {
  slcCorFundo.value = window.localStorage.getItem("cor_background");
} else {
  slcCorFundo.value = "rgb(255, 255, 255)";
}
document.getElementsByTagName("body")[0].style.backgroundColor =
  slcCorFundo.value;

if (window.localStorage.getItem("cor_foreground") !== null) {
  slcCorFonte.value = window.localStorage.getItem("cor_foreground");
} else {
  slcCorFonte.value = "rgb(0, 0, 0)";
}
document.getElementsByTagName("body")[0].style.color = slcCorFonte.value;

if (window.localStorage.getItem("cor_linha") !== null) {
  slcCorLinha.value = window.localStorage.getItem("cor_linha");
} else {
  slcCorLinha.value = "rgb(0, 0, 205)";
}

btnSalvar.addEventListener("click", function () {
  window.localStorage.setItem("cor_background", slcCorFundo.value);
  window.localStorage.setItem("cor_foreground", slcCorFonte.value);
  window.localStorage.setItem("cor_linha", slcCorLinha.value);
  window.location.reload();
});

draw();

document.getElementById("form").onsubmit = function (event) {
  event.preventDefault();
  draw();
};

window.onresize = draw;
