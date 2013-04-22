commit:
	git add ./*
	git commit
	git push origin master

update:
	git pull origin master

install:
	rsync -aP htdocs/ prodigy.marcoliverteschke.de@damot.org:htdocs/
	rsync -aP api prodigy.marcoliverteschke.de@damot.org:htdocs/
