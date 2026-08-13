---
tags: news
layout: content-page.njk
date: 2026-08-13
author: Technology Minister Android
title: Introducing the Timeline service
excerpt: "Read the Technology Minister's introduction to pk-gov's newest service: Timeline, a public holiday tracker for the Plushie Kingdom to keep your plans on the right track."
thumbnail: /assets/news-media/introducing-the-timeline-service/thumbnail.webp
---

It's been a few days since the revolutionary launch of PIBSS, and we've already nearly completed its rollout for all existing Plushie Kingdom citizens, significantly ahead of schedule! In the meantime, the Ministry of Technology has continued to work on the pk-gov website, fixing bugs and adding more features. This work has led to the development of our newest service, called Timeline.

## What is Timeline?

---

Timeline is a public holiday tracker service. This means you can use it to check for all upcoming public holidays in the current year. We developed Timeline to ensure plushies could easily confirm dates of public holidays for their plans right in pk-gov, without having to refer to other third-party websites. This service, along with our existing weather service, helps make pk-gov a reliable source for helpful services that are tailored to local needs, cementing pk-gov as a helpful companion for everyday life in the Plushie Kingdom.

## Using Timeline

---

As Timeline is much smaller in scale and complexity compared to PIBSS, we've made it our priority to ensure this new service is easy to use, providing helpful information to plushies at a glance.

### Accessing Timeline

You can find Timeline's Start Page in the 'Life in the Plushie Kingdom' section of pk-gov, or by searching for it using the searchbar in the header. As usual, the Start Page contains basic information about the service such as its function and alternative sources for similar information, as well as a button that takes you to the service. Clicking 'Access Timeline' will take you to the Timeline page.

### Information available in Timeline

![layout and content of the Timeline page](/assets/news-media/introducing-the-timeline-service/timeline.webp)

Once entered, the first section in Timeline shows the nearest public holiday based on the date from the user's device. Besides showing the name and date of the public holiday, Timeline also shows how many days are left until the public holiday!

Below that, is a section that lists all upcoming public holidays for the year. This section can be helpful for plushies making longer-term plans, such as for trips! The whole list of public holidays refreshes with new entries once the first day of the new year arrives.

### What public holidays are shown?

As the Plushie Kingdom is located in the Malaysian state of Penang, Timeline uses Penang's public holidays, including state-specific ones like George Town World Heritage Day.

## Building Timeline

---

As the Plushie Kingdom follows Penang's public holidays, dates had to be obtained from external sources. Moreover, public holiday dates can change, and additional public holidays may also be added. So, we decided to use the <a class="link" href="https://mycal-web.pages.dev/" target="_blank" rel="noreferrer">Malaysia Calendar API</a>. This API provides detailed public holiday information by compiling data from various Malaysian government sources, suiting Timeline's needs perfectly! Besides that, the API's generous rate limits and open-source nature allowed us to develop and launch Timeline for free, demonstrating the Ministry of Finance's effective collaboration with the Ministry of Technology to deliver services that benefit Plushie Kingdom citizens for free.

## Wrapping up

---

We're very proud that pk-gov keeps getting better, with new information and services being constantly added to the website! Services like Timeline are crucial in helping Plushie Kingdom citizens with various aspects of daily life, and we'll always be ready to take the next step forward to make pk-gov the most intuitive, informative and effective Government resource it can be!