Keep Countdown timer
====
매일 추가되는 시간을 카운트 다운하면서 동기 부여하는 프로그램입니다. 

동기 부여가 되도록 매일 하고 싶은 항목(ex. 공부)을 정하면 정한 시간만큼 매일 추가되어 전체 해야 하는 시간을 알수 있다. 
원하는 항목을 선택해서 Start를 하면 전체 시간에서 카운트가 시작되어 내가 실제로 한 시간만큼 빼진다. 


## Features
- 정한 시간 간격만큼 매일 추가됨
- '+' : 원하는 항목을 추가
- 'X' : 선택한 항목을 삭제
- '[]' : 선택한 항목을 수정 (ex. 시간)
- Pause : 해당 항목에 대해서 시간 업데이틀 하지 않음 (ex. 여행시 정한 시간을 추가되지 않도록 해줌)    
- Start : 카운트 다운을 시작함 (ex. 실제 공부한 시간이 카운트됨)
- Stop :  카운트 다운을 멈춤


<a href="/images/main.png" target="_blank">
<img src="/images/main.png" width="300" /></a>

<a href="/images/timer_start.png" target="_blank">
<img src="/images/timer_start.png" width="300" /></a>

<a href="/images/timer_add.png" target="_blank">
<img src="/images/timer_add.png" width="300" /></a>
 

## 추가 작업목록 - 2차 (누구나 참여 가능합니다)
- [ ] 다른 web framework(ex. Vue.js)를 이용해서 재작성
  - 첫번째 버전은 vanilla 버전으로 작성되어 있음.
- 다른 UI design 사용해보기 (ex. Materials)  

## 필요한 패키지 설치
- 실행 환경은 mac 기반으로 작성되었습니다. 

### 1. MongoDB 설치 및 실행방법
brew 패키지 명령어로 mongodb 설치후 실행한다. 
~~~
$ brew install mongodb
$ mkdir -p ~/develop/mongodb
$ mongod --dbpath ~/develop/mongodb
~~~


### 2. sample data db에 넣고 시작하기 (ex. 테스트) 
~~~
$ node data/populate.js
~~~


### 3. node 모듈에 필요한 library 설치후 앱 실행  
~~~
$ npm install
$ npm start
~~~

<a href="/images/npm_startpng" target="_blank">
<img src="/images/npm_start.png" width="500" /></a> 

http://localhost:3000 에 접속한다. 
