document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");

  // 버튼 클릭 이벤트 설정
  document.getElementById("btn-step-1").addEventListener("click", loadDefaultLayout);
  document.getElementById("btn-step-2").addEventListener("click", loadLayoutSelection);

  // 1단계: 기본 레이아웃 로드
  function loadDefaultLayout() {
    container.innerHTML = ''; // 기존 내용 초기화

    // 첫 번째 줄: 날씨 테이블, 파이 차트, 레이다 차트
    const row1 = document.createElement("div");
    row1.className = "row-layout";
    row1.append(
      createWidget("날씨 테이블", createTable()),
      createWidget("파이 차트", createChart("pie", weatherData)),
      createWidget("레이다 차트", createChart("radar", weatherData))
    );

    // 두 번째 줄: 선 그래프
    const row2 = document.createElement("div");
    row2.className = "row-layout";
    row2.appendChild(createWidget("선 그래프", createChart("line", extendedWeatherData)));

    // 세 번째 줄: 바 차트
    const row3 = document.createElement("div");
    row3.className = "row-layout";
    row3.appendChild(createWidget("바 차트", createChart("bar", extendedWeatherData)));

    // 모든 줄을 컨테이너에 추가
    container.append(row1, row2, row3);
  }

  // 2단계: 레이아웃 선택 화면
  function loadLayoutSelection() {
    container.innerHTML = ''; // 초기화

    // 레이아웃 버튼을 감싸는 컨테이너 추가
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "layout-button-container";

    const layout1Button = createLayoutButton("레이아웃 1", loadDefaultLayout);
    const layout2Button = createLayoutButton("레이아웃 2", loadNewLayout);

    buttonContainer.append(layout1Button, layout2Button);
    container.appendChild(buttonContainer);
  }

  // 2단계 레이아웃: 새로운 레이아웃 구현
  function loadNewLayout() {
    container.innerHTML = ''; // 초기화

    // 새로운 레이아웃 구조
    const row1 = document.createElement("div");
    row1.className = "row-layout";
    row1.appendChild(createWidget("선 그래프", createChart("line", extendedWeatherData)));

    const row2 = document.createElement("div");
    row2.className = "row-layout";
    row2.append(
      createWidget("바 차트", createChart("bar", extendedWeatherData)),
      createWidget("파이 차트", createChart("pie", weatherData)),
      createWidget("레이다 차트", createChart("radar", weatherData))
    );

    const row3 = document.createElement("div");
    row3.className = "row-layout";
    row3.appendChild(createWidget("날씨 테이블", createTable()));

    // 모든 줄을 컨테이너에 추가
    container.append(row1, row2, row3);
  }

  // 레이아웃 버튼 생성 함수
  function createLayoutButton(label, onClick) {
    const button = document.createElement("button");
    button.className = "layout-button";
    button.innerText = label; // 버튼에 레이블 추가
    button.onclick = onClick;
    return button;
  }

  // 위젯 생성 함수
  function createWidget(title, content) {
    const widget = document.createElement("div");
    widget.className = "widget";

    const header = document.createElement("div");
    header.className = "widget-header";
    header.innerText = title;

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "widget-content";
    contentWrapper.appendChild(content);

    widget.append(header, contentWrapper);
    return widget;
  }

  // 날씨 데이터 테이블 생성 함수
  function createTable() {
    const table = document.createElement("table");
    table.className = "table";
    table.innerHTML = `
      <thead><tr><th>요일</th><th>최저기온</th><th>최고기온</th></tr></thead>
      <tbody>
        ${weatherData.map(d => `<tr><td>${d.day}</td><td>${d.minTemp}°C</td><td>${d.maxTemp}°C</td></tr>`).join('')}
      </tbody>
    `;
    return table;
  }

  // 차트 생성 함수
  function createChart(type, data) {
    const canvas = document.createElement("canvas");
    new Chart(canvas, {
      type,
      data: {
        labels: data.map(d => d.day),
        datasets: [
          { label: "최저기온", data: data.map(d => d.minTemp), backgroundColor: "rgba(54, 162, 235, 0.5)" },
          { label: "최고기온", data: data.map(d => d.maxTemp), backgroundColor: "rgba(255, 99, 132, 0.5)" }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
    return canvas;
  }

  // 날씨 데이터
  const weatherData = [
    { day: "월", minTemp: 12, maxTemp: 22 },
    { day: "화", minTemp: 15, maxTemp: 25 },
    { day: "수", minTemp: 14, maxTemp: 24 },
    { day: "목", minTemp: 10, maxTemp: 20 },
    { day: "금", minTemp: 13, maxTemp: 23 },
    { day: "토", minTemp: 16, maxTemp: 26 },
    { day: "일", minTemp: 11, maxTemp: 21 }
  ];

  const extendedWeatherData = Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    minTemp: Math.floor(Math.random() * 10) + 10,
    maxTemp: Math.floor(Math.random() * 10) + 20
  }));

  // 초기 화면 설정 (단계 미선택 메시지)
  showDefaultMessage();

  function showDefaultMessage() {
    container.innerHTML = ''; // 초기화

    const message = document.createElement("div");
    message.className = "default-message";
    message.innerText = "단계 미선택";

    container.appendChild(message);
  }
});
