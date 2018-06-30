Keep Countdown timer

목적
- 항목을 추가해서 원하는 시간(ex. 공부, 운동)만큼 하도록 자가 둥기부여 하는 앱   

Feature
- '+' : 목록에 추가함
- 'X' : 선택한 항목 삭제
- '[]' : 선택한 항목 수정
- Pause : 시간 업데이틀 하지 않음 (ex. 여행시 정한 시간을 추가되지 않도록 해줌)    
- Start : 원하는 항목 선택후 count down 시작함 
- 매일 하루마다 정한 interval 만큼 추가됨 (밤 12시) 


실행하기

1.Mongo 시작 
~~~
$ mkdir -p ~/dev/mongodb
$ mongod --dbpath ~/dev/mongodb
~~~

2.sample data db에 넣기
~~~
$ node data/populate.js
~~~

3.npm package 설치후 start server
~~~
$ npm install
$ npm start
> keep-countdown-timer@0.0.0 start /Users/ykoh/WebstormProjects/keep-countdown-timer
> nodemon ./bin/www

[nodemon] 1.17.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node ./bin/www`
~~~


참고
- http://framework7.taobao.org/tutorials/mobile-mvc-apps-with-framework7-requirejs-and-handlerbars.html#.WwOo7VOFOAw
- 
