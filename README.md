# 검색 기능 구현하기

최근 검색어, 디바운스 입력 처리, 무한 스크롤을 리액트로 구현한 웹앱 형식뷰입니다.

## 기능

<ul>
  <li><strong>검색 바:</strong> 사용자가 검색어를 입력하고 추천 검색어와 최근 검색어를 볼 수 있습니다.</li>
  <li><strong>디바운싱:</strong> 검색 입력 시 디바운스를 구현하여 성능을 최적화합니다.</li>
  <li><strong>무한 스크롤:</strong> 사용자가 아래로 스크롤하거나 "더보기" 버튼을 클릭하면 더 많은 검색 결과를 로드합니다.</li>
  <li><strong>로컬 스토리지:</strong> 최근 검색어를 로컬 스토리지에 저장하여 세션 간에 유지합니다.</li>
  <li><strong>동적 필터링:</strong> 입력된 검색어에 따라 검색 결과를 필터링합니다.</li>
</ul>

## 설치 및 사용법

<ol>
  <li>프로젝트를 클론합니다.
    <pre><code>git clone https://github.com/munnarae/jeil_assignment.git</code></pre>
  </li>
  <li>프로젝트 디렉토리로 이동합니다.
    <pre><code>cd jeil_assignment</code></pre>
  </li>
  <li>필요한 패키지를 설치합니다.
    <pre><code>npm install</code></pre>
  </li>
  <li>애플리케이션을 시작합니다.
    <pre><code>npm run dev</code></pre>
  </li>
</ol>

## 주요 구성 요소

### SearchBar 컴포넌트

<ul>
  <li>사용자가 검색어를 입력하고 추천 검색어와 최근 검색어를 볼 수 있는 검색 바 컴포넌트입니다.</li>
  <li>로컬 스토리지에서 최근 검색어를 불러오고 저장합니다.</li>
  <li>디바운스를 사용하여 검색어 입력 시 성능을 최적화합니다.</li>
</ul>

### SearchResults 컴포넌트

<ul>
  <li>검색 결과를 표시하는 컴포넌트입니다.</li>
  <li>무한 스크롤과 "더보기" 버튼을 통해 더 많은 결과를 로드합니다.</li>
  <li>탭을 통해 전체, 업체, 업체 소식 등 다양한 검색 결과를 필터링합니다.</li>
</ul>

### Hooks

<ul>
  <li><strong>useDebounce:</strong> 검색어 입력 시 디바운스를 처리하는 커스텀 훅입니다.</li>
  <li><strong>useSearch:</strong> 검색어 필터링, 무한 스크롤, 검색 결과 로드 등의 기능을 처리하는 커스텀 훅입니다.</li>
</ul>

### 데이터

<ul>
  <li><strong>companyData:</strong> 회사 데이터를 포함하는 더미 데이터입니다.</li>
  <li><strong>suggestionsList:</strong> 추천 검색어 목록을 포함하는 데이터입니다.</li>
</ul>
