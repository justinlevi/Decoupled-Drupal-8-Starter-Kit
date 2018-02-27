<?php

namespace Drupal\graphql_page_mutation\Plugin\GraphQL\Mutations;

use Drupal\graphql_core\Plugin\GraphQL\Mutations\Entity\UpdateEntityBase;
use Youshido\GraphQL\Execution\ResolveInfo;

/**
 * A Simple PageNode mutation.
 *
 * @GraphQLMutation(
 *   id = "update_page",
 *   entity_type = "node",
 *   entity_bundle = "page",
 *   secure = true,
 *   name = "updatePage",
 *   type = "EntityCrudOutput!",
 *   arguments = {
 *     "id" = "Int",
 *     "input" = "BasicPageUpdate"
 *   }
 * )
 */
class UpdatePage extends UpdateEntityBase {

  /**
   * {@inheritdoc}
   */
  protected function extractEntityInput(array $args, ResolveInfo $info) {
    return [
      'title' => $args['input']['title'],
      'body' => $args['input']['body'],
      'field_media_image' => $args['input']['field_media_image'],
    ];
  }

}
