welcome="\n ===============Welcome to blingy!===============\n"
commandslist1="setup commands: <install>, <refresh>, <run>\n"
commandslist2="create commands: <new>, <publish>, <list>\n"
commandslist3="remove commands: <unpublish>, <delete>\n"
commandslist4="misc commands: <update-template>, <watch>\n"
hr="================================================\n"
start="  \n\n  ----------Getting Started: \n\n"

install=" [install]  \n Sets up blingy in current directory \n\n "
refresh=" [refresh]  \n After updating your site.js for the first time, run install \n\n "
run=" [run] (recommend running in a new tab) \n Run this command while you work and before you push to the outside world \n\t also lets you view your blog locally: http://127.0.0.1:9966 \n\n "

workflow="\n\n  ----------Writing new articles: \n\n"
new=" [new] <articleName> \n Creates a new draft article in .md \n (located in /posts) where you type up your new post! \n\n "
publish=" [publish] <articleName> \n Publishes a draft article in html, this will make it visible on your blog \n\n "
list=" [list] Lists all articles \n "

workflow2="\n\n  ----------Removing articles: \n\n"
unpublish=" [unpublish] <articleName> \n Removes article from live site and deletes the HTML article \n\n "
remove=" [delete] <articleName> \n Deletes draft article \n"

misc="\n\n  ----------Misc: \n\n"
template=" [update-template] \n Run this if you make any changes to the handlebars templates \n\n"
watch=" [watchjs] \n Watches main.js for any changes and browserifies it to bundle.js \n\n"

case $1 in
    "install" )
        /usr/local/lib/node_modules/blingy/bin/client/install.sh ;;
    "refresh" )
        /usr/local/lib/node_modules/blingy/bin/client/init.sh ;;
    "unpublish" )
        /usr/local/lib/node_modules/blingy/bin/unpublish.sh $2 ;;
    "delete" )
        /usr/local/lib/node_modules/blingy/bin/remove-post.sh $2 ;;
    "new" )
        /usr/local/lib/node_modules/blingy/bin/draft-post.sh $2 ;;
    "list")
        /usr/local/lib/node_modules/blingy/bin/list-posts.sh ;;
    "publish" )
        /usr/local/lib/node_modules/blingy/bin/publish-post.sh $2 ;;
    "run" )
        /usr/local/lib/node_modules/blingy/bin/beefy.sh ;;
    "watchjs" )
        /usr/local/lib/node_modules/blingy/bin/watchify.sh ;;
    "update-template" )
        /usr/local/lib/node_modules/blingy/bin/update-template.sh ;;
    "help" )
        echo $welcome $hr $start $install $refresh $run $workflow $new $publish $list $workflow2 $unpublish $remove $misc $template $watch " ------> Usage 'blingy <command>' <------ \n\n" $commandslist1 $commandslist2 $commandslist3 $commandslist4;;
    *)
        echo $welcome $hr " ------> Usage 'blingy <command>' <------ \n\n" $commandslist1 $commandslist2 $commandslist3 $commandslist4;;
esac


# install
# unpublish
# remove
# draft
# list
# make
# run
# watchjs
#
# "bin/client/commands.sh"
# "bin/client/install.sh"
# "bin/unpublish.sh"
# "bin/remove-post.sh"
# "bin/draft-post.sh"
# "bin/list-posts.sh"
# "bin/publish-post.sh"
# "bin/beefy.sh"
# "bin/watchify.sh"
