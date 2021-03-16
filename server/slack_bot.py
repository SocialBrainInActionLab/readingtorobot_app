"""
    Slack bot to publish the server hostname.
"""

import os

from slack import WebClient


def publish_hostname() -> None:
    host = os.popen("hostname -I | awk '{print $1;}'").read()[0:-1]
    slack_client = WebClient(os.environ.get('SLACK_TOKEN'))
    slack_client.chat_postMessage(channel="reading_to_robot",
                                  text="Access Reading To Robot App in: http://{}:5000".format(host))


if __name__ == '__main__':
    publish_hostname()
