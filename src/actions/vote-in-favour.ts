import type { AllMiddlewareArgs, BlockButtonAction, SlackActionMiddlewareArgs, StringIndexed } from "@slack/bolt";
import { voting } from '../shared';

export default async function VoteInFavour(ctx: SlackActionMiddlewareArgs<BlockButtonAction> & AllMiddlewareArgs<StringIndexed>) {
    voting(ctx, 'in_favour')
}