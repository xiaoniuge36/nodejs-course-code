#!/bin/bash

# 动态获取当前提交人的邮箱和姓名
author_email=$(git config user.email)
author_name=$(git config user.name)

# 定义日志文件路径及名称
log_file="代码行提交日志.txt"

# 检查当前工作目录是否有未提交的改动
if git diff-index --quiet HEAD --; then
    echo "未检测到需要提交的改动，操作已终止。"
    exit 1
else
    echo "检测到有未提交的改动，准备提交更改..."
fi

# 提示用户选择提交类型
echo "请选择提交类型:"

# 定义选项
options=("feat" "fix" "docs" "style" "chore" "refactor")

# 使用 select 语句创建菜单
select type in "${options[@]}"; do
    if [[ -n $type ]]; then
        echo "您选择的提交类型是: $type"
        break
    else
        echo "无效选择，请重新选择."
    fi
done

# 提示用户输入提交信息
while true; do
    # 重置终端输入设置
    stty sane
    
    # 提示输入提交信息，并启用命令行编辑模式
    read -e -p "请输入提交信息: " commit_message

    # 检查提交信息是否为空
    if [[ -n "$commit_message" ]]; then
        break
    else
        echo "提交信息不能为空，请重新输入."
    fi
done

# 组合提交类型和消息
full_commit_message="$type: $commit_message"

# 确认提交信息
echo "提交信息: $full_commit_message"
read -p "是否确认提交? (y/n): " confirm
if [[ "$confirm" != "y" ]]; then
    echo "提交取消."
    exit 1
fi

# 拉取最新代码，确保本地代码是基于最新的远程代码
echo "正在拉取远程仓库最新代码..."
if git pull; then
    echo "拉取成功."
else
    echo "拉取失败，可能有冲突，请手动解决冲突后再尝试提交."
    exit 1
fi

# 添加所有变更到暂存区
git add .

# 执行 git 提交操作
if git commit -m "$full_commit_message"; then
    echo "提交成功."
else
    echo "提交失败，请检查问题."
    exit 1
fi

# 推送到远程仓库
echo "正在推送到远程仓库..."
if git push; then
    echo "推送成功."
else
    echo "推送失败，请检查网络连接或远程仓库权限."
    exit 1
fi

# 添加分隔符
separator="=============================="

# 获取本次提交的修改代码行数
echo "$separator"
echo "本次提交修改的代码行数（提交人: $author_email）:"
current_stats=$(git show --numstat --author="$author_email" HEAD | awk '{ add += $1; subs += $2; loc += $1 - $2; commit_lines += $1 + $2 } END { printf "\n增加的行数: %s\n删除的行数: %s\n净增加行数: %s\n提交代码数: %s\n", add, subs, loc, commit_lines }')
echo "$current_stats"
echo "$separator"

# 获取当日提交人的修改代码行数
echo "当日所有分支的代码行数（提交人: $author_email）:"
today_stats=$(git log --since="midnight" --numstat --author="$author_email" --pretty=tformat: | awk '{ add += $1; subs += $2; loc += $1 - $2; commit_lines += $1 + $2 } END { printf "\n增加的行数: %s\n删除的行数: %s\n净增加行数: %s\n提交代码数: %s\n", add, subs, loc, commit_lines }')
echo "$today_stats"
echo "$separator"

# 获取本月提交人的修改代码行数（当月的第一天到当前日期）
echo "本月所有分支的代码行数（提交人: $author_email）:"
month_stats=$(git log --since="$(date +%Y-%m-01)" --numstat --author="$author_email" --pretty=tformat: | awk '{ add += $1; subs += $2; loc += $1 - $2; commit_lines += $1 + $2 } END { printf "\n增加的行数: %s\n删除的行数: %s\n净增加行数: %s\n提交代码数: %s\n", add, subs, loc, commit_lines }')
echo "$month_stats"
echo "$separator"

# 获取本年提交人的修改代码行数（当年的第一天到当前日期）
#echo "本年所有分支的代码行数（提交人: $author_email）:"
year_stats=$(git log --since="$(date +%Y-01-01)" --numstat --author="$author_email" --pretty=tformat: | awk '{ add += $1; subs += $2; loc += $1 - $2; commit_lines += $1 + $2 } END { printf "\n增加的行数: %s\n删除的行数: %s\n净增加行数: %s\n提交代码数: %s\n", add, subs, loc, commit_lines }')
#echo "$year_stats"
#echo "$separator"

# 更新“代码提交统计”
echo "更新代码提交统计文件..."
{
    echo "$author_name 的代码提交行数统计"
    echo "最后一次更新日期: $(date)"
    echo "提交信息: $full_commit_message"
    echo "$separator"
    echo "本次提交:"
    echo "$current_stats"
    echo "$separator"
    echo "当日汇总:"
    echo "$today_stats"
    echo "$separator"
    echo "本月汇总:"
    echo "$month_stats"
    echo "$separator"
    echo "本年汇总:"
    echo "$year_stats"
    echo "$separator"
    echo -e "\n\n"
} > "$log_file" 

echo "代码提交统计已更新到文件：$log_file"

# 脚本结束
echo "提交完成!"
