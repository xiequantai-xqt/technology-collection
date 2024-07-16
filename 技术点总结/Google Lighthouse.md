Google Lighthouse 得分是 Google 开发的网页审计工具 Lighthouse 为网站的特定方面提供的量化评价。Lighthouse 会根据一系列预定义的性能指标和最佳实践来分析网页，并为以下几个关键领域生成得分：

1. **性能（Performance）**：衡量网页加载速度以及响应时间。这包括首次内容绘制（First Contentful Paint，FCP）、最大内容绘制（Largest Contentful Paint，LCP）、总阻塞时间（Total Blocking Time，TBT）和累积布局偏移（Cumulative Layout Shift，CLS）等指标。
2. **无障碍性（Accessibility）**：检查网页是否遵循无障碍标准，确保所有用户都能访问网站，包括视觉障碍、听力障碍或运动障碍的用户。
3. **最佳实践（Best Practices）**：评估网页是否符合最佳编码实践，如使用 HTTPS、压缩资源、避免使用重定向等。
4. **SEO（Search Engine Optimization）**：分析网页是否有利于搜索引擎索引和排名，包括元数据、可读性、结构化数据等。
5. **PWA（Progressive Web App）**：针对渐进式 Web 应用程序的标准，如是否可以离线使用、是否有服务工作者（Service Worker）、是否有图标和启动屏幕等。

每个领域的得分范围是从 0 到 100，其中 0 表示最差，100 表示最佳。一般而言，得分为 50 到 89 被认为是良好，而 90 到 100 被视为优秀。Lighthouse 的目标是帮助开发者识别和修复影响网页质量和用户体验的问题，从而提高得分和整体网站质量。

Lighthouse 可以通过 Chrome 浏览器的开发者工具运行，也可以作为 Node.js 库或者 CLI 工具在自动化构建流程中使用。

在Google怎么看？

1. 在开发者工具中打开“Lighthouse ”；
2. 这里可以选择不同的审计类型，包括“性能”、“无障碍性”、“最佳实践”、“SEO”和“PWA”。你可以勾选你感兴趣的类别，或者默认情况下它们都会被选中；
3. 点击“生成报告”按钮开始分析。Lighthouse 将会运行一系列的测试，这可能需要几分钟的时间；
4. 当 Lighthouse 完成审计后，报告将自动生成并展示在 Lighthouse 面板中。报告包含每个类别的得分，以及详细的改进建议和具体问题；
5. 你可以展开各个审计项目，查看具体的评分细节和优化建议；
6. 如果需要，你还可以导出报告为 JSON 或 HTML 格式，以便与团队分享或存档；

![](https://mine-tech-blog.oss-cn-shenzhen.aliyuncs.com/%E5%89%8D%E7%AB%AF/Google%C2%A0Lighthouse.png)