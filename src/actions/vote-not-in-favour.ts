import type { AllMiddlewareArgs, BlockButtonAction, SlackActionMiddlewareArgs, StringIndexed } from "@slack/bolt";
import { voting } from '../shared';

export default async function VoteNotInFavour(ctx: SlackActionMiddlewareArgs<BlockButtonAction> & AllMiddlewareArgs<StringIndexed>) {
    voting(ctx, 'not_in_favour')
}