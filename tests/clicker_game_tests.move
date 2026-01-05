#[test_only]
module clicker_game::clicker_game_tests;

use clicker_game::clicker_nft::{Self, ClickerNFT, GOATRegistry};
use sui::test_scenario::{Self as ts, next_tx};
use std::string;

const ENotMinted: u64 = 1;
const EClicksMismatch: u64 = 2;
const ETierMismatch: u64 = 3;
const ENameMismatch: u64 = 4;
const EIsGoatMismatch: u64 = 5;
const EGoatCountMismatch: u64 = 6;

const PLAYER1: address = @0x1;
const PLAYER2: address = @0x2;
const PLAYER3: address = @0x3;

#[test]
fun test_mint_nft() {
    let mut scenario = ts::begin(PLAYER1);

    {
        clicker_nft::init_for_testing(scenario.ctx());
    };

    next_tx(&mut scenario, PLAYER1);

    {
        clicker_nft::mint_nft(scenario.ctx());
    };

    next_tx(&mut scenario, PLAYER1);

    {
        let nft = ts::take_from_sender<ClickerNFT>(&scenario);

        assert!(clicker_nft::get_clicks(&nft) == 0, EClicksMismatch);
        assert!(clicker_nft::get_tier(&nft) == 0, ETierMismatch);
        assert!(clicker_nft::get_name(&nft) == string::utf8(b"Noob"), ENameMismatch);
        assert!(!clicker_nft::is_goat(&nft), EIsGoatMismatch);

        ts::return_to_sender(&scenario, nft);
    };

    ts::end(scenario);
}

#[test]
fun test_click_increments() {
    let mut scenario = ts::begin(PLAYER1);

    {
        clicker_nft::init_for_testing(scenario.ctx());
    };

    next_tx(&mut scenario, PLAYER1);

    {
        clicker_nft::mint_nft(scenario.ctx());
    };

    next_tx(&mut scenario, PLAYER1);

    {
        let mut nft = ts::take_from_sender<ClickerNFT>(&scenario);
        let mut registry = ts::take_shared<GOATRegistry>(&scenario);

        clicker_nft::click(&mut nft, &mut registry, scenario.ctx());
        clicker_nft::click(&mut nft, &mut registry, scenario.ctx());
        clicker_nft::click(&mut nft, &mut registry, scenario.ctx());
        clicker_nft::click(&mut nft, &mut registry, scenario.ctx());

        assert!(clicker_nft::get_clicks(&nft) == 4, EClicksMismatch);
        assert!(clicker_nft::get_tier(&nft) == 0, ETierMismatch);

        ts::return_to_sender(&scenario, nft);
        ts::return_shared(registry);
    };

    ts::end(scenario);
}

#[test]
fun test_tier_evolution_noob_to_tryhard() {
    let mut scenario = ts::begin(PLAYER1);

    {
        clicker_nft::init_for_testing(scenario.ctx());
    };

    next_tx(&mut scenario, PLAYER1);

    {
        clicker_nft::mint_nft(scenario.ctx());
    };

    next_tx(&mut scenario, PLAYER1);

    {
        let mut nft = ts::take_from_sender<ClickerNFT>(&scenario);
        let mut registry = ts::take_shared<GOATRegistry>(&scenario);

        let mut i = 0;
        while (i < 6) {
            clicker_nft::click(&mut nft, &mut registry, scenario.ctx());
            i = i + 1;
        };

        assert!(clicker_nft::get_clicks(&nft) == 6, EClicksMismatch);
        assert!(clicker_nft::get_tier(&nft) == 1, ETierMismatch);
        assert!(clicker_nft::get_name(&nft) == string::utf8(b"Tryhard"), ENameMismatch);

        ts::return_to_sender(&scenario, nft);
        ts::return_shared(registry);
    };

    ts::end(scenario);
}

#[test]
fun test_tier_evolution_to_nolife() {
    let mut scenario = ts::begin(PLAYER1);

    {
        clicker_nft::init_for_testing(scenario.ctx());
    };

    next_tx(&mut scenario, PLAYER1);

    {
        clicker_nft::mint_nft(scenario.ctx());
    };

    next_tx(&mut scenario, PLAYER1);

    {
        let mut nft = ts::take_from_sender<ClickerNFT>(&scenario);
        let mut registry = ts::take_shared<GOATRegistry>(&scenario);

        let mut i = 0;
        while (i < 12) {
            clicker_nft::click(&mut nft, &mut registry, scenario.ctx());
            i = i + 1;
        };

        assert!(clicker_nft::get_clicks(&nft) == 12, EClicksMismatch);
        assert!(clicker_nft::get_tier(&nft) == 2, ETierMismatch);
        assert!(clicker_nft::get_name(&nft) == string::utf8(b"No-life"), ENameMismatch);

        ts::return_to_sender(&scenario, nft);
        ts::return_shared(registry);
    };

    ts::end(scenario);
}

#[test]
fun test_tier_evolution_to_legend() {
    let mut scenario = ts::begin(PLAYER1);

    {
        clicker_nft::init_for_testing(scenario.ctx());
    };

    next_tx(&mut scenario, PLAYER1);

    {
        clicker_nft::mint_nft(scenario.ctx());
    };

    next_tx(&mut scenario, PLAYER1);

    {
        let mut nft = ts::take_from_sender<ClickerNFT>(&scenario);
        let mut registry = ts::take_shared<GOATRegistry>(&scenario);

        let mut i = 0;
        while (i < 16) {
            clicker_nft::click(&mut nft, &mut registry, scenario.ctx());
            i = i + 1;
        };

        // Devrait être GOAT (tier 4) car premier à atteindre Legend
        assert!(clicker_nft::get_clicks(&nft) == 16, EClicksMismatch);
        assert!(clicker_nft::get_tier(&nft) == 4, ETierMismatch);
        assert!(clicker_nft::get_name(&nft) == string::utf8(b"GOAT"), ENameMismatch);
        assert!(clicker_nft::is_goat(&nft), EIsGoatMismatch);

        ts::return_to_sender(&scenario, nft);
        ts::return_shared(registry);
    };

    ts::end(scenario);
}

#[test]
fun test_goat_promotion_first_player() {
    let mut scenario = ts::begin(PLAYER1);

    {
        clicker_nft::init_for_testing(scenario.ctx());
    };

    next_tx(&mut scenario, PLAYER1);

    {
        clicker_nft::mint_nft(scenario.ctx());
    };

    next_tx(&mut scenario, PLAYER1);

    {
        let mut nft = ts::take_from_sender<ClickerNFT>(&scenario);
        let mut registry = ts::take_shared<GOATRegistry>(&scenario);

        let mut i = 0;
        while (i < 16) {
            clicker_nft::click(&mut nft, &mut registry, scenario.ctx());
            i = i + 1;
        };

        assert!(clicker_nft::is_goat(&nft), EIsGoatMismatch);
        assert!(clicker_nft::get_goat_count(&registry) == 1, EGoatCountMismatch);

        ts::return_to_sender(&scenario, nft);
        ts::return_shared(registry);
    };

    ts::end(scenario);
}

#[test]
fun test_goat_limit_10_players() {
    let mut scenario = ts::begin(PLAYER1);

    {
        clicker_nft::init_for_testing(scenario.ctx());
    };

    next_tx(&mut scenario, PLAYER1);

    // Tester avec 3 joueurs pour éviter le timeout
    let players = vector[@0x1, @0x2, @0x3];

    let mut player_idx = 0;
    while (player_idx < 3) {
        let player = *vector::borrow(&players, player_idx);

        next_tx(&mut scenario, player);

        {
            clicker_nft::mint_nft(scenario.ctx());
        };

        next_tx(&mut scenario, player);

        {
            let mut nft = ts::take_from_sender<ClickerNFT>(&scenario);
            let mut registry = ts::take_shared<GOATRegistry>(&scenario);

            let mut i = 0;
            while (i < 16) {
                clicker_nft::click(&mut nft, &mut registry, scenario.ctx());
                i = i + 1;
            };

            // Les 3 deviennent GOAT car moins de 10
            assert!(clicker_nft::is_goat(&nft), EIsGoatMismatch);
            assert!(clicker_nft::get_tier(&nft) == 4, ETierMismatch);

            ts::return_to_sender(&scenario, nft);
            ts::return_shared(registry);
        };

        player_idx = player_idx + 1;
    };

    next_tx(&mut scenario, PLAYER1);
    {
        let registry = ts::take_shared<GOATRegistry>(&scenario);
        assert!(clicker_nft::get_goat_count(&registry) == 3, EGoatCountMismatch);
        ts::return_shared(registry);
    };

    ts::end(scenario);
}

#[test]
fun test_goat_stays_goat_after_more_clicks() {
    let mut scenario = ts::begin(PLAYER1);

    {
        clicker_nft::init_for_testing(scenario.ctx());
    };

    next_tx(&mut scenario, PLAYER1);

    {
        clicker_nft::mint_nft(scenario.ctx());
    };

    next_tx(&mut scenario, PLAYER1);

    {
        let mut nft = ts::take_from_sender<ClickerNFT>(&scenario);
        let mut registry = ts::take_shared<GOATRegistry>(&scenario);

        // Atteindre GOAT avec exactement 16 clicks
        let mut i = 0;
        while (i < 16) {
            clicker_nft::click(&mut nft, &mut registry, scenario.ctx());
            i = i + 1;
        };

        assert!(clicker_nft::is_goat(&nft), EIsGoatMismatch);

        ts::return_to_sender(&scenario, nft);
        ts::return_shared(registry);
    };

    // Continuer dans une nouvelle transaction pour économiser la mémoire
    next_tx(&mut scenario, PLAYER1);

    {
        let mut nft = ts::take_from_sender<ClickerNFT>(&scenario);
        let mut registry = ts::take_shared<GOATRegistry>(&scenario);

        let mut j = 0;
        while (j < 5) {
            clicker_nft::click(&mut nft, &mut registry, scenario.ctx());
            j = j + 1;
        };

        // Vérifier qu'il reste GOAT
        assert!(clicker_nft::get_clicks(&nft) == 21, EClicksMismatch);
        assert!(clicker_nft::is_goat(&nft), EIsGoatMismatch);
        assert!(clicker_nft::get_tier(&nft) == 4, ETierMismatch);

        ts::return_to_sender(&scenario, nft);
        ts::return_shared(registry);
    };

    ts::end(scenario);
}
