-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 27 Apr 2025 pada 15.32
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel-lks-1`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `administrators`
--

CREATE TABLE `administrators` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `administrators`
--

INSERT INTO `administrators` (`id`, `username`, `password`, `last_login_at`, `created_at`, `updated_at`) VALUES
(1, 'Test Admin', '$2y$12$T0OdWgDkcHbIHBHim0eDoesKuIYaCwrs/8nSmrJa6Il0ggFOOaWxO', '2025-04-27 06:26:32', '2025-04-25 20:36:19', '2025-04-27 06:26:32');

-- --------------------------------------------------------

--
-- Struktur dari tabel `games`
--

CREATE TABLE `games` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `games`
--

INSERT INTO `games` (`id`, `title`, `slug`, `description`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 'Demo Game 123', 'demo-game-1', 'WALAWE A', 9, '2025-04-26 03:03:53', '2025-04-26 04:22:13', NULL),
(4, 'Demo Game 2', 'demo-game-2', 'This is demo game 2', 9, '2025-04-26 03:55:30', '2025-04-26 04:26:54', '2025-04-26 04:26:54'),
(5, 'HAHA', 'haha', 'INI GAME WAK', 9, '2025-04-26 23:17:15', '2025-04-26 23:17:15', NULL),
(6, 'GEM TU', 'gem-tu', 'INI GAME WAK', 9, '2025-04-26 23:20:02', '2025-04-26 23:20:02', NULL),
(7, 'game123', 'game123', 'INI GAME WAK', 9, '2025-04-26 23:20:22', '2025-04-26 23:20:22', NULL),
(8, 'GAME1', 'game1', 'INI GAME WAK', 9, '2025-04-26 23:21:35', '2025-04-26 23:21:35', NULL),
(9, 'GAME2', 'game2', 'INI GAME WAK', 9, '2025-04-26 23:23:53', '2025-04-26 23:23:53', NULL),
(10, 'AWEGAME', 'awegame', 'GAME MANTAP WAK', 13, '2025-04-27 05:10:17', '2025-04-27 05:10:17', NULL),
(11, 'GAME BARU', 'game-baru', 'halo wak kamu ucu', 13, '2025-04-27 05:12:40', '2025-04-27 05:12:40', NULL),
(12, 'GEM BERU', 'gem-beru', 'oafjpawjfpwajfpwaojfpaowjfpowajfopwafawfawf wafawfwaf', 13, '2025-04-27 05:14:12', '2025-04-27 05:14:12', NULL),
(13, 'ada ada a dadad', 'ada-ada-a-dadad', 'awdwadwad', 13, '2025-04-27 05:15:04', '2025-04-27 05:15:04', NULL),
(14, 'aweaweaweaweaw', 'aweaweaweaweaw', 'aweawewaeaweawewae', 13, '2025-04-27 05:24:12', '2025-04-27 05:24:12', NULL),
(15, 'awwdwdwdw', 'awwdwdwdw', '12321321321', 13, '2025-04-27 05:26:52', '2025-04-27 05:26:52', NULL),
(16, 'woy tayooooo', 'woy-tayooooo', 'awewaewaewae', 13, '2025-04-27 05:27:28', '2025-04-27 05:27:28', NULL),
(17, 'MUTU WAH', 'mutu-wah', 'awdwadwadawdwad', 13, '2025-04-27 05:32:59', '2025-04-27 05:32:59', NULL),
(18, 'RA CETHO awwa', 'ra-cetho-awwa', 'awawdawd', 13, '2025-04-27 05:33:29', '2025-04-27 05:33:29', NULL),
(19, 'awojoaijawiojdawiojdaw', 'awojoaijawiojdawiojdaw', 'awdwadawdawdaw', 13, '2025-04-27 05:35:51', '2025-04-27 05:35:51', NULL),
(20, 'MALASZZZZZ', 'malaszzzzz', 'awdawdawdawdawdawdawdaw', 13, '2025-04-27 05:40:49', '2025-04-27 05:40:49', NULL),
(21, 'TAMBAH GAME BARU', 'tambah-game-baru', '2131242142142142', 9, '2025-04-27 05:43:28', '2025-04-27 05:43:28', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `game_versions`
--

CREATE TABLE `game_versions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `game_id` bigint(20) UNSIGNED NOT NULL,
  `version` varchar(255) NOT NULL,
  `storage_path` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `game_versions`
--

INSERT INTO `game_versions` (`id`, `game_id`, `version`, `storage_path`, `created_at`, `updated_at`, `deleted_at`) VALUES
(4, 3, '1', 'games/demo-game-1/versions/v1', '2025-04-26 03:03:57', '2025-04-26 04:25:54', '2025-04-26 04:25:54'),
(5, 3, '2', 'games/demo-game-1/versions/v2', '2025-04-26 03:18:48', '2025-04-26 04:25:54', '2025-04-26 04:25:54'),
(6, 3, '3', 'games/demo-game-1/versions/v3', '2025-04-26 03:31:08', '2025-04-26 04:25:54', '2025-04-26 04:25:54'),
(7, 5, '1', 'games/HAHA/versions/v1', '2025-04-26 23:18:08', '2025-04-26 23:18:08', NULL),
(8, 5, '2', 'games/HAHA/versions/v2', '2025-04-26 23:19:52', '2025-04-26 23:19:52', NULL),
(9, 7, '1', 'games/game123/versions/v1', '2025-04-26 23:20:28', '2025-04-26 23:20:28', NULL),
(10, 8, '1', 'games/GAME1/versions/v1', '2025-04-26 23:21:40', '2025-04-26 23:21:40', NULL),
(11, 9, '1', 'games/GAME2/versions/v1', '2025-04-26 23:23:58', '2025-04-26 23:23:58', NULL),
(12, 20, '1', 'games/malaszzzzz/versions/v1', '2025-04-27 05:40:52', '2025-04-27 05:40:52', NULL),
(13, 21, '1', 'games/tambah-game-baru/versions/v1', '2025-04-27 05:43:30', '2025-04-27 05:43:30', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2025_04_09_082259_create_personal_access_tokens_table', 1),
(2, '2025_04_23_061208_create_users_table', 1),
(3, '2025_04_23_061218_create_administrators_table', 1),
(4, '2025_04_23_061234_create_games_table', 1),
(5, '2025_04_23_061244_create_game_versions_table', 1),
(6, '2025_04_23_061258_create_scores_table', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(48, 'App\\Models\\User', 3, 'user_auth_token', 'e52e6c18735044355af8dda649370ad0eb11e0f0cbfdd603e6f5b18d5d8ec216', '[\"*\"]', NULL, NULL, '2025-04-26 02:57:42', '2025-04-26 02:57:42'),
(49, 'App\\Models\\User', 4, 'user_auth_token', '11103a3f9ce14c4d93699ad9aed8b6cf45af5cafb0fa573fabb8e81095a7c976', '[\"*\"]', NULL, NULL, '2025-04-26 02:59:31', '2025-04-26 02:59:31'),
(50, 'App\\Models\\User', 6, 'user_auth_token', '33b5c781892876a629a4b43e4d788a2f103ce4673827e1f68469081053b88ccf', '[\"*\"]', NULL, NULL, '2025-04-26 03:00:45', '2025-04-26 03:00:45'),
(51, 'App\\Models\\User', 8, 'user_auth_token', '49f7b43cc82d230d9ef89337b71ded3658ee965fa897ee093a758bfde3a3bff0', '[\"*\"]', NULL, NULL, '2025-04-26 03:02:56', '2025-04-26 03:02:56'),
(52, 'App\\Models\\User', 9, 'user_auth_token', '4b3c445757334269a10335d8df935eecb8b6e45f051dfe5dd2fa6f3c1222095d', '[\"*\"]', NULL, NULL, '2025-04-26 03:03:02', '2025-04-26 03:03:02'),
(53, 'App\\Models\\User', 10, 'user_auth_token', 'e79e8113a66f5942961caf73425e85784e80fcde7764498def087723ed8ac35a', '[\"*\"]', NULL, NULL, '2025-04-26 03:03:21', '2025-04-26 03:03:21'),
(54, 'App\\Models\\User', 11, 'user_auth_token', 'b968e1f56f83cfba199075846ef20a9fe9e25353ab20f1f5525402bd32e297d6', '[\"*\"]', NULL, NULL, '2025-04-26 03:03:27', '2025-04-26 03:03:27'),
(55, 'App\\Models\\User', 9, 'user_auth_token', 'ad99d0e72bc7da43a1dd10a9eb1b96c868910ac424e77b58256019f928dd0d82', '[\"user\"]', '2025-04-26 03:31:18', '2025-05-03 03:03:41', '2025-04-26 03:03:41', '2025-04-26 03:31:18'),
(56, 'App\\Models\\Administrator', 1, 'admin_auth_token', 'bdd21efdd476e47546c5a06394532e79e6bce752858eb57f34a24b53bd52c2c8', '[\"admin\"]', '2025-04-26 03:47:31', '2025-05-03 03:32:25', '2025-04-26 03:32:25', '2025-04-26 03:47:31'),
(57, 'App\\Models\\User', 9, 'user_auth_token', '57a0626db31e164d3d6b995a721822412a19b6fadec03acd4e5b4d993c2bd70d', '[\"user\"]', '2025-04-26 04:19:13', '2025-05-03 03:47:49', '2025-04-26 03:47:49', '2025-04-26 04:19:13'),
(58, 'App\\Models\\Administrator', 1, 'admin_auth_token', '7dcadb2f8307695bf76aeb0a0922c44b2398ee3c636bc3f206407098862235fb', '[\"admin\"]', '2025-04-26 04:19:24', '2025-05-03 04:19:20', '2025-04-26 04:19:19', '2025-04-26 04:19:24'),
(59, 'App\\Models\\User', 9, 'user_auth_token', 'f512c3f9462d25040e6f419073a9a307a6f5cad73422d83238eeea91fa078a9b', '[\"user\"]', '2025-04-26 04:26:51', '2025-05-03 04:20:54', '2025-04-26 04:20:54', '2025-04-26 04:26:51'),
(60, 'App\\Models\\User', 9, 'user_auth_token', '826d31c703463f218ab6d64422c693d628f20873b913ee7a7e082a29c392991f', '[\"user\"]', NULL, '2025-05-03 06:05:33', '2025-04-26 06:05:33', '2025-04-26 06:05:33'),
(61, 'App\\Models\\User', 9, 'user_auth_token', '1187c08c9f17df3aa2bef137db950c330aa67358df07fcea211e37467791853a', '[\"user\"]', NULL, '2025-05-03 06:08:55', '2025-04-26 06:08:55', '2025-04-26 06:08:55'),
(62, 'App\\Models\\Administrator', 1, 'admin_auth_token', '3ce382bcafece4ccbf6c2ce49bacbbea385a507055e775f96db5ed1061bc552f', '[\"admin\"]', NULL, '2025-05-03 06:25:17', '2025-04-26 06:25:17', '2025-04-26 06:25:17'),
(63, 'App\\Models\\Administrator', 1, 'admin_auth_token', '59e320778be72aa90220f0c5c05bce4d672fe1cc644e4404988763d3f3678ac6', '[\"admin\"]', '2025-04-26 06:32:26', '2025-05-03 06:29:24', '2025-04-26 06:29:24', '2025-04-26 06:32:26'),
(64, 'App\\Models\\Administrator', 1, 'admin_auth_token', '9351e005d75ebaa1c73d0949aaa4c955780a1b80a26cbdc025b5206158ff5084', '[\"admin\"]', '2025-04-26 07:06:55', '2025-05-03 07:06:53', '2025-04-26 07:06:53', '2025-04-26 07:06:55'),
(65, 'App\\Models\\User', 9, 'user_auth_token', '6638d2fa2986be12e68e3439e2ddbbfc763ab5ba70f0499003043b63c3691b08', '[\"user\"]', '2025-04-26 07:15:43', '2025-05-03 07:08:09', '2025-04-26 07:08:08', '2025-04-26 07:15:43'),
(66, 'App\\Models\\User', 9, 'user_auth_token', '6e8324f13322cd2460b0e8a0decae81ce4c9fb8dcbf27c21a0957f122675118a', '[\"user\"]', '2025-04-26 07:32:52', '2025-05-03 07:31:40', '2025-04-26 07:31:40', '2025-04-26 07:32:52'),
(67, 'App\\Models\\User', 9, 'user_auth_token', '70b089c573bb15df532a6580022a78553171bc35f8c18c779bab715b62d750e6', '[\"user\"]', NULL, '2025-05-03 18:52:49', '2025-04-26 18:52:48', '2025-04-26 18:52:49'),
(68, 'App\\Models\\Administrator', 1, 'admin_auth_token', '2e492df87c877828919a80d7c5ca426c3f0bd93188bb8c030d0beb20c20d1228', '[\"admin\"]', '2025-04-26 18:58:38', '2025-05-03 18:57:35', '2025-04-26 18:57:35', '2025-04-26 18:58:38'),
(69, 'App\\Models\\Administrator', 1, 'admin_auth_token', '36a854ddb47e8cba214809884083ca919c920904e1bec591e10183ef70209b3b', '[\"admin\"]', '2025-04-26 18:59:05', '2025-05-03 18:59:04', '2025-04-26 18:59:04', '2025-04-26 18:59:05'),
(70, 'App\\Models\\Administrator', 1, 'admin_auth_token', 'af147403beaff97a7606ea1d881ea2be7de538789927ca1b5dd51f339223eea2', '[\"admin\"]', '2025-04-26 19:00:51', '2025-05-03 19:00:50', '2025-04-26 19:00:50', '2025-04-26 19:00:51'),
(71, 'App\\Models\\User', 9, 'user_auth_token', '59806c4c81226eee23ac02f8db9c8fe9dca236fdf07c8f343210bff47cf0b226', '[\"user\"]', NULL, '2025-05-03 19:03:45', '2025-04-26 19:03:45', '2025-04-26 19:03:45'),
(74, 'App\\Models\\Administrator', 1, 'admin_auth_token', 'effd1683c47acb88b4f102224e8c2a5796d01fb7800bb97b70b4009a97aff2a4', '[\"admin\"]', '2025-04-26 19:34:20', '2025-05-03 19:34:10', '2025-04-26 19:34:10', '2025-04-26 19:34:20'),
(76, 'App\\Models\\User', 9, 'user_auth_token', '530f4af93ad601c66eb6bd6e088426c8b94b61e3b4624eb00061bbf4f86e8ad1', '[\"user\"]', NULL, '2025-05-03 19:38:22', '2025-04-26 19:38:22', '2025-04-26 19:38:22'),
(77, 'App\\Models\\User', 9, 'user_auth_token', '91de5cf53a6a8302bb418b048eb96a385004344cbd6a2d9ec11bece367ea8516', '[\"user\"]', NULL, '2025-05-03 19:41:32', '2025-04-26 19:41:32', '2025-04-26 19:41:32'),
(78, 'App\\Models\\User', 9, 'user_auth_token', '3c2a05f94ddb220f83da51b455ad6a1cb12fe3ac9c1ca98ba350a91bfa4f9acb', '[\"user\"]', NULL, '2025-05-03 19:42:21', '2025-04-26 19:42:21', '2025-04-26 19:42:21'),
(79, 'App\\Models\\User', 9, 'user_auth_token', 'e5189d3e7c7d53f2f8a1922c3c92318a0d282e74a598608fd355fd3483ee77fd', '[\"user\"]', NULL, '2025-05-03 19:46:40', '2025-04-26 19:46:40', '2025-04-26 19:46:40'),
(80, 'App\\Models\\User', 12, 'user_auth_token', '8a1ac78605eed3e076b66e727c7feb1e4e17bbc07480b61e8d4fbe61ad320412', '[\"*\"]', NULL, NULL, '2025-04-26 19:59:44', '2025-04-26 19:59:44'),
(81, 'App\\Models\\User', 13, 'user_auth_token', '6a21b29cc7f02ad1ac167ace47ca9e27bbd259fc368e4c48f3afe524e764c297', '[\"*\"]', NULL, NULL, '2025-04-26 20:00:06', '2025-04-26 20:00:06'),
(83, 'App\\Models\\User', 14, 'user_auth_token', '818bb911a40e1640b0a2cdf1cc08a0ae74f53e41bf4bfe7e8f1b10202c6f468d', '[\"*\"]', NULL, NULL, '2025-04-26 20:00:56', '2025-04-26 20:00:56'),
(87, 'App\\Models\\Administrator', 1, 'admin_auth_token', 'b3dabb82c8d871ac614fc29163e5565c606c2d25ad67905a87c81fbba9c8a53c', '[\"admin\"]', '2025-04-26 20:29:50', '2025-05-03 20:17:54', '2025-04-26 20:17:54', '2025-04-26 20:29:50'),
(90, 'App\\Models\\User', 9, 'user_auth_token', '641f5e7479a4bd846deda384d2e36c0c6e879bd5ea3ffc780f6087fe5e77d960', '[\"user\"]', NULL, '2025-05-03 22:24:46', '2025-04-26 22:24:46', '2025-04-26 22:24:46'),
(91, 'App\\Models\\Administrator', 1, 'admin_auth_token', '77edb572b2eb2f2f08a440294de2c4f0f9c78a4e91cd55f1dd8de8e48c4cd003', '[\"admin\"]', NULL, '2025-05-03 22:33:55', '2025-04-26 22:33:55', '2025-04-26 22:33:55'),
(96, 'App\\Models\\User', 9, 'user_auth_token', 'b3f742d2e0acacc95321bbebe142d23ab8bbaf946efc412926317e7d1529bc5e', '[\"user\"]', '2025-04-26 23:34:50', '2025-05-03 22:42:03', '2025-04-26 22:42:03', '2025-04-26 23:34:50'),
(97, 'App\\Models\\User', 9, 'user_auth_token', 'ab5c9d95fe0941684c8b42463a44fd2921052d31140a82f39b7c4e88d5ea7999', '[\"user\"]', '2025-04-26 23:23:58', '2025-05-03 23:16:56', '2025-04-26 23:16:55', '2025-04-26 23:23:58'),
(98, 'App\\Models\\User', 9, 'user_auth_token', '15d1b943166b8e011719e77c2073fc46ce02ff50cee646e65c770071664eb32e', '[\"user\"]', '2025-04-27 00:08:42', '2025-05-03 23:35:03', '2025-04-26 23:35:03', '2025-04-27 00:08:42'),
(101, 'App\\Models\\User', 16, 'user_auth_token', '84a7a2a12d6bc6bf2f6064dcffb97155353ca353236c4866b764ad325b19968b', '[\"*\"]', NULL, NULL, '2025-04-27 04:11:29', '2025-04-27 04:11:29'),
(104, 'App\\Models\\User', 9, 'user_auth_token', '52cecd7a37bd1ccc39f07d1d6f567e212ca13ce6e1d60bc871ba3a29f3789977', '[\"user\"]', '2025-04-27 05:43:40', '2025-05-04 05:42:29', '2025-04-27 05:42:29', '2025-04-27 05:43:40'),
(105, 'App\\Models\\User', 9, 'user_auth_token', '398851e700a426c7d1a43bfec94fceeea069d949983779a39d91d06d63dfd4e9', '[\"user\"]', '2025-04-27 05:53:12', '2025-05-04 05:45:15', '2025-04-27 05:45:15', '2025-04-27 05:53:12'),
(106, 'App\\Models\\Administrator', 1, 'admin_auth_token', '994686fb7d7edcb78bd1806ee85be62fc786707fae3783421c00b9e1f9e0cd3b', '[\"admin\"]', '2025-04-27 06:16:58', '2025-05-04 06:10:15', '2025-04-27 06:10:15', '2025-04-27 06:16:58'),
(107, 'App\\Models\\Administrator', 1, 'admin_auth_token', '69e21f575d37f20265964ab47d470ea7becc14ec9978d01751a57a5f84c87b38', '[\"admin\"]', '2025-04-27 06:18:27', '2025-05-04 06:17:45', '2025-04-27 06:17:45', '2025-04-27 06:18:27'),
(108, 'App\\Models\\Administrator', 1, 'admin_auth_token', 'bc4630f6d72ac8f7cc010c5cee4d8fb908f0e66a3195d33e13a2f6aa0d8f2a92', '[\"admin\"]', '2025-04-27 06:19:16', '2025-05-04 06:19:14', '2025-04-27 06:19:14', '2025-04-27 06:19:16'),
(109, 'App\\Models\\Administrator', 1, 'admin_auth_token', '0eaf4b61831a8d4d4edf3d1f110f365f0dd9b0982609f65643e8e9c8aecc7466', '[\"admin\"]', '2025-04-27 06:23:55', '2025-05-04 06:22:45', '2025-04-27 06:22:45', '2025-04-27 06:23:55'),
(111, 'App\\Models\\User', 9, 'user_auth_token', '2bd71c7f9866490058fc72d301f5fd00657a2af7a8a03e577b43fe76328e3ab9', '[\"user\"]', NULL, '2025-05-04 06:26:50', '2025-04-27 06:26:50', '2025-04-27 06:26:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `scores`
--

CREATE TABLE `scores` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `game_version_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `score` double(13,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `scores`
--

INSERT INTO `scores` (`id`, `user_id`, `game_version_id`, `created_at`, `updated_at`, `score`) VALUES
(5, 1, 6, '2025-04-26 03:46:58', '2025-04-26 03:46:58', 8.00),
(6, 9, 6, '2025-04-26 03:48:00', '2025-04-26 03:48:00', 10.00),
(7, 9, 6, '2025-04-26 03:48:01', '2025-04-26 03:48:01', 10.00),
(8, 9, 6, '2025-04-26 03:48:03', '2025-04-26 03:48:03', 10.00),
(9, 9, 10, '2025-04-27 03:51:23', '2025-04-27 03:51:23', 9930.00),
(10, 16, 10, '2025-04-27 04:11:44', '2025-04-27 04:11:44', 1427.00);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `delete_reason` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `last_login_at`, `created_at`, `updated_at`, `deleted_at`, `delete_reason`) VALUES
(3, 'TEST USER', '$2y$12$nw548JblTb4hgEllaceh1e7f41wYegnfpQeRyaYS67KC5HIkFKKIW', NULL, '2025-04-26 02:57:42', '2025-04-26 03:46:03', '2025-04-26 03:46:03', 'RA CETHO'),
(4, 'Test', '$2y$12$EtosxaGnsVouIk/iZM/pGeDxHOr/K4wYyCBsmdoHc0d1jMzPRTOy.', NULL, '2025-04-26 02:59:31', '2025-04-26 02:59:31', NULL, NULL),
(6, 'AWE1234', '$2y$12$/dBIbUgcItFnDriLc35MLu9esu6nfWR/YgW4PZE/k0Q.8BgPTRxRa', NULL, '2025-04-26 03:00:45', '2025-04-26 03:44:01', '2025-04-26 03:44:01', 'WALAWE'),
(8, 'AWe1234', '$2y$12$sSN.zKHCnjlr26k9l7BUGuF3L2FHf1CNyXQRLVUD7txXrMsdnaoIe', NULL, '2025-04-26 03:02:56', '2025-04-26 03:32:37', '2025-04-26 03:32:37', NULL),
(9, 'Test User', '$2y$12$siIFEDQ4zppmJgos6OmC8eQQPjRqn4v/uFP3BwioXXO6Y/gg5YiRG', '2025-04-27 06:26:50', '2025-04-26 03:03:02', '2025-04-27 06:26:50', NULL, NULL),
(10, 'NGUWAWOR', 'NGUWAWOR', NULL, '2025-04-26 03:03:21', '2025-04-27 06:22:49', '2025-04-27 06:22:49', 'DELETE BY ADMIN'),
(11, 'TeSt User', '$2y$12$eH4R4qDaJqVweNq.xLUfhunMfA4HJrC09DfXPoOCld3M9gKIl1t2q', NULL, '2025-04-26 03:03:27', '2025-04-27 06:26:40', '2025-04-27 06:26:40', 'DELETE BY ADMIN'),
(12, 'user123', '$2y$12$Hinbh5HpNQHhY0.zw4PkSOOR2SdYnTumJbPPj/OAOCNq7DAN187F2', NULL, '2025-04-26 19:59:44', '2025-04-26 19:59:44', NULL, NULL),
(13, 'awe123', '$2y$12$vbv34eLiQjjbmWCH/5yU2u42zhURyAEJuf8MWip/xX0wk523DGBXG', '2025-04-27 04:13:32', '2025-04-26 20:00:06', '2025-04-27 04:13:32', NULL, NULL),
(14, 'ADMIN', '123455677', '2025-04-26 20:01:05', '2025-04-26 20:00:56', '2025-04-26 22:20:32', NULL, NULL),
(15, 'AWE12345', '$2y$12$7SdEP8aaErPCiOF46SKjiOzAYiP/SBkdy5VE/R8BIi6qGNI0MVrU.', NULL, '2025-04-26 22:05:05', '2025-04-26 22:05:05', NULL, NULL),
(16, 'halo123', '$2y$12$NPaKi46S8vyRpgmeUf2OtOIQMRwWa5XVf6D8gLxw1bfScq9dEHr/O', '2025-04-27 04:11:37', '2025-04-27 04:11:29', '2025-04-27 04:11:37', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `administrators`
--
ALTER TABLE `administrators`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `administrators_username_unique` (`username`);

--
-- Indeks untuk tabel `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`),
  ADD KEY `games_created_by_foreign` (`created_by`);

--
-- Indeks untuk tabel `game_versions`
--
ALTER TABLE `game_versions`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeks untuk tabel `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `administrators`
--
ALTER TABLE `administrators`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `games`
--
ALTER TABLE `games`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT untuk tabel `game_versions`
--
ALTER TABLE `game_versions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT untuk tabel `scores`
--
ALTER TABLE `scores`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `games`
--
ALTER TABLE `games`
  ADD CONSTRAINT `games_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
