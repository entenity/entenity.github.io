node post_copy.js

git add .

git commit -m 'update'

git push

git checkout deploy

node file_move.js

git add .

git commit -m 'update'

git pull gitee deploy

git push github deploy

git checkout master

git push

exit