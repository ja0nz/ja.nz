// Endpoint: .well-known/webfinger.json
export async function get() {
  return {
    body: JSON.stringify({
      subject: "acct:ja0nz@indieweb.social",
      aliases: [
        "https://indieweb.social/@ja0nz",
        "https://indieweb.social/users/ja0nz",
      ],
      links: [
        {
          rel: "http://webfinger.net/rel/profile-page",
          type: "text/html",
          href: "https://indieweb.social/@ja0nz",
        },
        {
          rel: "self",
          type: "application/activity+json",
          href: "https://indieweb.social/users/ja0nz",
        },
        {
          rel: "http://ostatus.org/schema/1.0/subscribe",
          template: "https://indieweb.social/authorize_interaction?uri={uri}",
        },
      ],
    }),
  };
}
