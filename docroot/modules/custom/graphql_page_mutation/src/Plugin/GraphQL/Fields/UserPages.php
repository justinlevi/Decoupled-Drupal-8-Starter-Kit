<?php

namespace Drupal\graphql_signed_s3_upload\Plugin\GraphQL\Fields;

use Drupal\Core\DependencyInjection\DependencySerializationTrait;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\graphql\Plugin\GraphQL\Fields\FieldPluginBase;
use Drupal\graphql_signed_s3_upload\SignedUploadURLManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Youshido\GraphQL\Execution\ResolveInfo;

/**
 * List everything we've got in our page.
 *
 * @GraphQLField(
 *   id = "signedUploadURL",
 *   secure = true,
 *   name = "signedUploadURL",
 *   type = "Entity",
 *   multi = true,
 *   response_cache_max_age = 0,
 *   arguments = {
 *      "input" = "SignedUploadInput"
 *   }
 * )
 */
class UserPages extends FieldPluginBase implements ContainerFactoryPluginInterface {
    use DependencySerializationTrait;

    /**
     * The page instance.
     *
     * @var \Drupal\graphql_signed_s3_upload\SignedUploadURLManager
     */
    protected $signedUploadURLManager;

    /**
     * {@inheritdoc}
     */
    public function resolveValues($value, array $args, ResolveInfo $info) {
        $result = $this->signedUploadURLManager->generateUrls($args['input']['fileNames']);
        foreach ($result as $signedUrl) {
            yield $signedUrl;
        }
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container, array $configuration, $pluginId, $pluginDefinition) {

        /** @var \Drupal\graphql_signed_s3_upload\SignedUploadURLManager $signedUploadURLManager */
        $signedUploadURLManager = $container->get('graphql_signed_s3_upload.signed_upload_url_manager');

        return new static(
            $configuration,
            $pluginId,
            $pluginDefinition,
            $signedUploadURLManager
        );
    }

    /**
     * Constructs a Drupal\Component\Plugin\PluginBase object.
     *
     * @param array $configuration
     *   A configuration array containing information about the plugin instance.
     * @param $pluginId
     * @param $pluginDefinition
     * @param \Drupal\graphql_signed_s3_upload\SignedUploadURLManager $signedUploadURLManager
     */
    public function __construct(array $configuration, $pluginId, $pluginDefinition, $signedUploadURLManager) {
        $this->signedUploadURLManager = $signedUploadURLManager;
        parent::__construct($configuration, $pluginId, $pluginDefinition);
    }

}
