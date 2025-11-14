const sheetUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQnFkwJaPwAh9cBB4F2NSHGiLJFiQZvTVtndsT445yT1atoaLPhZZ5MSSwhpS7KFa1Ast6SkUswsH4l/pub?output=csv";

async function loadAssets() {
  const res = await fetch(sheetUrl);
  const text = await res.text();
  const rows = text.split("\n").map(r => r.split(","));
  const headers = rows[0];
  const data = rows.slice(1).filter(r => r[0].trim() !== "");

  const grid = document.getElementById("assetGrid");
  grid.innerHTML = "";

  data.forEach((row, i) => {
    const no = i + 1;
    const kodeMaterial = row[1] || "-";
    const assetDesc = row[4] || "-";
    const location = row[5] || "-";
    const kodeAsset = row[2] || "-";

    // QR code link (pakai API chart Google biar cepat)
    const detailUrl = `detail.html?kode=${encodeURIComponent(kodeAsset)}`;
    const qrUrl = `https://chart.googleapis.com/chart?chs=120x120&cht=qr&chl=${encodeURIComponent(detailUrl)}`;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${no}</td>
      <td><a href="${detailUrl}">${kodeMaterial}</a></td>
      <td>${assetDesc}</td>
      <td>${location}</td>
      <td><img src="${qrUrl}" alt="QR ${kodeAsset}" class="qr" /></td>
    `;
    grid.appendChild(tr);
  });
}

loadAssets();

