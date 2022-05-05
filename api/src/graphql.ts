import { graphql } from "@octokit/graphql";
import { Fn } from "@thi.ng/api";
import { comp } from "@thi.ng/compose";
import { getI, getR, queryBodyI, queryI, queryR, queryTitleI } from "gh-cms-ql";

export const qlClient = ({ GH_TOKEN, owner, repo }: Env) => graphql.defaults({
    headers: {
        authorization: `token ${GH_TOKEN}`,
        accept: "application/vnd.github.v3+json",
    },
    variables: {
        owner,
        repo,
    },
});

type GHCursor = string;
export function queryIPager(): Fn<GHCursor, string> {
    return (s: GHCursor) => comp(queryR, queryI(s))(queryTitleI, queryBodyI);
}
export async function fetchExhaust(
    env: Env,
    query: Fn<GHCursor, string>,
): Promise<Array<any>> {
    const nodes: Array<any> = [];
    let cursor: GHCursor = '';
    while (true) {
        const ql = await qlClient(env)(query(cursor));
        const qPayLoad = comp(getI, getR)(ql);
        nodes.push(...qPayLoad.nodes);
        if (qPayLoad.pageInfo.hasNextPage) {
            cursor = qPayLoad.pageInfo.endCursor;
            continue;
        }

        break;
    }

    return nodes;
}
