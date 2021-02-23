# UseAge for pm2 
常用命令
```
pm2 start app.js // 启动

pm2 start -i 4 // cluster mode 启动4个app的应用示例，4个应用程序会自动进行负载均衡

$ pm2 start script.sh          # 启动 bash 脚本

$ pm2 list                      # 列表 PM2 启动的所有的应用程序

$ pm2 monit                    # 显示每个应用程序的CPU和内存占用情况

$ pm2 show [app-name]          # 显示应用程序的所有信息

$ pm2 logs                      # 显示所有应用程序的日志

$ pm2 logs [app-name]          # 显示指定应用程序的日志

$ pm2 flush                       # 清空所有日志文件

$ pm2 stop all                  # 停止所有的应用程序

$ pm2 stop 0                    # 停止 id为 0的指定应用程序

$ pm2 restart all              # 重启所有应用

$ pm2 reload all                # 重启 cluster mode下的所有应用

$ pm2 gracefulReload all        # Graceful reload all apps in cluster mode

$ pm2 delete all                # 关闭并删除所有应用

$ pm2 delete 0                  # 删除指定应用 id 0

$ pm2 scale api 10              # 把名字叫api的应用扩展到10个实例

$ pm2 reset [app-name]          # 重置重启数量

$ pm2 startup                  # 创建开机自启动命令

$ pm2 save                      # 保存当前应用列表

$ pm2 resurrect                # 重新加载保存的应用列表

$ pm2 update                    # Save processes, kill PM2 and restore processes

$ pm2 generate                  # Generate a sample json configuration file

// -- 命令
    -V, --version                                                output the version number
    -v --version                                                 print pm2 version
    -s --silent                                                  hide all messages
    --ext <extensions>                                           watch only this file extensions
    -n --name <name>                                             set a name for the process in the process list
    -m --mini-list                                               display a compacted list without formatting
    --interpreter <interpreter>                                  set a specific interpreter to use for executing app, default: node
    --interpreter-args <arguments>                               set arguments to pass to the interpreter (alias of --node-args)
    --node-args <node_args>                                      space delimited arguments to pass to node
    -o --output <path>                                           specify log file for stdout
    -e --error <path>                                            specify log file for stderr
    -l --log [path]                                              specify log file which gathers both stdout and stderr
    --filter-env [envs]                                          filter out outgoing global values that contain provided strings (default: )
    --log-type <type>                                            specify log output style (raw by default, json optional)
    --log-date-format <date format>                              add custom prefix timestamp to logs
    --time                                                       enable time logging
    --disable-logs                                               disable all logs storage
    --env <environment_name>                                     specify which set of environment variables from ecosystem file must be injected
    -a --update-env                                              force an update of the environment with restart/reload (-a <=> apply)
    -f --force                                                   force actions
    -i --instances <number>                                      launch [number] instances (for networked app)(load balanced)
    --parallel <number>                                          number of parallel actions (for restart/reload)
    --shutdown-with-message                                      shutdown an application with process.send('shutdown') instead of process.kill(pid, SIGINT)
    -p --pid <pid>                                               specify pid file
    -k --kill-timeout <delay>                                    delay before sending final SIGKILL signal to process
    --listen-timeout <delay>                                     listen timeout on application reload
    --max-memory-restart <memory>                                Restart the app if an amount of memory is exceeded (in bytes)
    --restart-delay <delay>                                      specify a delay between restarts (in milliseconds)
    --exp-backoff-restart-delay <delay>                          specify a delay between restarts (in milliseconds)
    -x --execute-command                                         execute a program using fork system
    --max-restarts [count]                                       only restart the script COUNT times
    -u --user <username>                                         define user when generating startup script
    --uid <uid>                                                  run target script with <uid> rights
    --gid <gid>                                                  run target script with <gid> rights
    --namespace <ns>                                             start application within specified namespace
    --cwd <path>                                                 run target script from path <cwd>
    --hp <home path>                                             define home path when generating startup script
    --wait-ip                                                    override systemd script to wait for full internet connectivity to launch pm2
    --service-name <name>                                        define service name when generating startup script
    -c --cron <cron_pattern>                                     restart a running process based on a cron pattern
    -w --write                                                   write configuration in local folder
    --no-daemon                                                  run pm2 daemon in the foreground if it doesn't exist already
    --source-map-support                                         force source map support
    --only <application-name>                                    with json declaration, allow to only act on one application
    --disable-source-map-support                                 force source map support
    --wait-ready                                                 ask pm2 to wait for ready event from your app
    --merge-logs                                                 merge logs from different instances but keep error and out separated
    --watch [paths]                                              watch application folder for changes (default: )
    --ignore-watch <folders|files>                               List of paths to ignore (name or regex)
    --watch-delay <delay>                                        specify a restart delay after changing files (--watch-delay 4 (in sec) or 4000ms)
    --no-color                                                   skip colors
    --no-vizion                                                  start an app without vizion feature (versioning control)
    --no-autorestart                                             start an app without automatic restart
    --no-treekill                                                Only kill the main process, not detached children
    --no-pmx                                                     start an app without pmx
    --no-automation                                              start an app without pmx
    --trace                                                      enable transaction tracing with km
    --disable-trace                                              disable transaction tracing with km
    --attach                                                     attach logging after your start/restart/stop/reload
    --v8                                                         enable v8 data collecting
    --event-loop-inspector                                       enable event-loop-inspector dump in pmx
    --deep-monitoring                                            enable all monitoring tools (equivalent to --v8 --event-loop-inspector --trace)
    -h, --help                                                   output usage information
```
## pm2-logrotate
操作格式：  
```JS
pm2 set pm2-logrotate:{paramName} {value}

// e.g:

pm2 set pm2-logrotate:max_size 1K (1KB)
pm2 set pm2-logrotate:compress true (compress logs when rotated)
pm2 set pm2-logrotate:rotateInterval '*/1 * * * *' (force rotate every minute)
```
参数有：

+ Compress：是否通过gzip压缩日志

+ max_size：单个日志文件的大小，比如上图中设置为1K（这个其实太小了，实际文件大小并不会严格分为1K）

+ retain：保留的日志文件个数，比如设置为10,那么在日志文件达到10个后会将最早的日志文件删除掉

+ dateFormat：日志文件名中的日期格式，默认是YYYY-MM-DD_HH-mm-ss，注意是设置的日志名+这个格式，如设置的日志名为abc.log，那就会生成abc_YYYY-MM-DD_HH-mm-ss.log名字的日志文件

+ rotateModule：把pm2本身的日志也进行分割

+ workerInterval：设置启动几个工作进程监控日志尺寸，最小为1

+ rotateInterval：设置强制分割，默认值是0 0 * * *，意思是每天晚上0点分割
```
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```
